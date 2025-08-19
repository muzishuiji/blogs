/**
 * Promise重试工具库
 * 支持多种重试策略，包括指数退避、线性延迟等
 */

/**
 * 基础Promise重试函数
 * @param {Function} fn - 返回Promise的函数
 * @param {Object} options - 配置选项
 * @returns {Promise} - 重试后的Promise
 */
function promiseRetry(fn, options = {}) {
  const {
    retries = 3,                    // 最大重试次数
    delay = 1000,                   // 基础延迟时间(ms)
    maxDelay = 30000,              // 最大延迟时间(ms)
    factor = 2,                    // 指数退避倍数
    strategy = 'exponential',       // 重试策略: 'fixed', 'linear', 'exponential'
    jitter = true,                 // 是否添加随机抖动
    onRetry = null,                // 重试回调函数
    shouldRetry = null,            // 自定义重试条件
    timeout = null                 // 单次操作超时时间
  } = options;

  let attempt = 0;

  const executeWithRetry = async () => {
    try {
      // 如果设置了超时时间，包装原函数
      const wrappedFn = timeout ? withTimeout(fn, timeout) : fn;
      const result = await wrappedFn();
      return result;
    } catch (error) {
      attempt++;

      // 检查是否应该重试
      if (attempt > retries) {
        throw new RetryError(`Max retries (${retries}) exceeded`, error, attempt - 1);
      }

      // 自定义重试条件检查
      if (shouldRetry && !shouldRetry(error, attempt)) {
        throw error;
      }

      // 计算延迟时间
      const delayTime = calculateDelay(attempt - 1, delay, maxDelay, factor, strategy, jitter);

      // 调用重试回调
      if (onRetry) {
        onRetry(error, attempt, delayTime);
      }

      // 等待后重试
      await sleep(delayTime);
      return executeWithRetry();
    }
  };

  return executeWithRetry();
}

/**
 * 高级Promise重试类
 */
class PromiseRetrier {
  constructor(options = {}) {
    this.defaultOptions = {
      retries: 3,
      delay: 1000,
      maxDelay: 30000,
      factor: 2,
      strategy: 'exponential',
      jitter: true,
      timeout: null
    };
    
    this.options = { ...this.defaultOptions, ...options };
    this.stats = {
      totalAttempts: 0,
      successfulRetries: 0,
      failedRetries: 0
    };
  }

  /**
   * 执行重试
   */
  async execute(fn, options = {}) {
    const finalOptions = { ...this.options, ...options };
    
    try {
      const result = await promiseRetry(fn, {
        ...finalOptions,
        onRetry: (error, attempt, delay) => {
          this.stats.totalAttempts++;
          if (finalOptions.onRetry) {
            finalOptions.onRetry(error, attempt, delay);
          }
        }
      });
      
      this.stats.successfulRetries++;
      return result;
    } catch (error) {
      this.stats.failedRetries++;
      throw error;
    }
  }

  /**
   * 获取统计信息
   */
  getStats() {
    return { ...this.stats };
  }

  /**
   * 重置统计信息
   */
  resetStats() {
    this.stats = {
      totalAttempts: 0,
      successfulRetries: 0,
      failedRetries: 0
    };
  }
}

/**
 * 批量重试多个Promise
 * @param {Array} promises - Promise函数数组
 * @param {Object} options - 重试配置
 * @returns {Promise<Array>} - 结果数组
 */
async function promiseRetryAll(promises, options = {}) {
  const {
    concurrency = 3,              // 并发数量
    failFast = false,             // 是否快速失败
    ...retryOptions
  } = options;

  const results = [];
  const errors = [];

  // 创建信号量控制并发
  const semaphore = new Semaphore(concurrency);

  const executePromise = async (promiseFn, index) => {
    await semaphore.acquire();
    
    try {
      const result = await promiseRetry(promiseFn, retryOptions);
      results[index] = { status: 'fulfilled', value: result };
    } catch (error) {
      const retryError = { status: 'rejected', reason: error };
      results[index] = retryError;
      errors.push({ index, error });
      
      if (failFast) {
        throw error;
      }
    } finally {
      semaphore.release();
    }
  };

  // 执行所有Promise
  const tasks = promises.map((promiseFn, index) => 
    executePromise(promiseFn, index)
  );

  try {
    await Promise.all(tasks);
  } catch (error) {
    if (failFast) {
      throw error;
    }
  }

  return {
    results,
    errors,
    successCount: results.filter(r => r.status === 'fulfilled').length,
    errorCount: errors.length
  };
}

/**
 * 计算延迟时间
 */
function calculateDelay(attempt, baseDelay, maxDelay, factor, strategy, jitter) {
  let delay;

  switch (strategy) {
    case 'fixed':
      delay = baseDelay;
      break;
    
    case 'linear':
      delay = baseDelay * (attempt + 1);
      break;
    
    case 'exponential':
    default:
      delay = baseDelay * Math.pow(factor, attempt);
      break;
  }

  // 限制最大延迟
  delay = Math.min(delay, maxDelay);

  // 添加随机抖动
  if (jitter) {
    const jitterAmount = delay * 0.1 * Math.random();
    delay = delay + jitterAmount;
  }

  return Math.floor(delay);
}

/**
 * 睡眠函数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 为Promise添加超时
 */
function withTimeout(promiseFn, timeout) {
  return () => {
    return Promise.race([
      promiseFn(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new TimeoutError(`Operation timed out after ${timeout}ms`)), timeout)
      )
    ]);
  };
}

/**
 * 信号量实现（控制并发）
 */
class Semaphore {
  constructor(permits) {
    this.permits = permits;
    this.waiting = [];
  }

  async acquire() {
    if (this.permits > 0) {
      this.permits--;
      return;
    }

    return new Promise(resolve => {
      this.waiting.push(resolve);
    });
  }

  release() {
    this.permits++;
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      this.permits--;
      resolve();
    }
  }
}

/**
 * 自定义错误类
 */
class RetryError extends Error {
  constructor(message, originalError, attempts) {
    super(message);
    this.name = 'RetryError';
    this.originalError = originalError;
    this.attempts = attempts;
  }
}

class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * 便捷的重试装饰器
 */
function retryable(options = {}) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
      return promiseRetry(() => originalMethod.apply(this, args), options);
    };
    
    return descriptor;
  };
}

/**
 * 创建可重试的函数
 */
function createRetryableFunction(fn, options = {}) {
  return function(...args) {
    return promiseRetry(() => fn.apply(this, args), options);
  };
}

// ============ 使用示例 ============

/**
 * 模拟网络请求
 */
async function mockNetworkRequest(url, shouldFail = false) {
  await sleep(Math.random() * 1000 + 500); // 模拟网络延迟
  
  if (shouldFail && Math.random() < 0.7) { // 70% 失败率
    throw new Error(`Network request to ${url} failed`);
  }
  
  return { data: `Response from ${url}`, timestamp: Date.now() };
}

/**
 * 模拟数据库操作
 */
async function mockDatabaseOperation(query) {
  await sleep(Math.random() * 500 + 200);
  
  if (Math.random() < 0.4) { // 40% 失败率
    throw new Error('Database connection timeout');
  }
  
  return { result: `Query result for: ${query}` };
}

/**
 * 使用示例和测试
 */
async function examples() {
  console.log('=== Promise重试示例 ===\n');

  // 示例1: 基础重试
  console.log('1. 基础重试示例:');
  try {
    const result = await promiseRetry(
      () => mockNetworkRequest('https://api.example.com/data', true),
      {
        retries: 3,
        delay: 1000,
        strategy: 'exponential',
        onRetry: (error, attempt, delay) => {
          console.log(`  重试第 ${attempt} 次，延迟 ${delay}ms，错误: ${error.message}`);
        }
      }
    );
    console.log('  成功:', result);
  } catch (error) {
    console.log('  最终失败:', error.message);
  }
  console.log();

  // 示例2: 使用PromiseRetrier类
  console.log('2. PromiseRetrier类示例:');
  const retrier = new PromiseRetrier({
    retries: 2,
    delay: 500,
    strategy: 'linear'
  });

  try {
    const result = await retrier.execute(
      () => mockDatabaseOperation('SELECT * FROM users')
    );
    console.log('  成功:', result);
  } catch (error) {
    console.log('  失败:', error.message);
  }
  
  console.log('  统计信息:', retrier.getStats());
  console.log();

  // 示例3: 批量重试
  console.log('3. 批量重试示例:');
  const urls = [
    'https://api1.example.com',
    'https://api2.example.com',
    'https://api3.example.com'
  ];
  
  const promiseFunctions = urls.map(url => 
    () => mockNetworkRequest(url, true)
  );

  const batchResult = await promiseRetryAll(promiseFunctions, {
    retries: 2,
    delay: 1000,
    concurrency: 2,
    onRetry: (error, attempt, delay) => {
      console.log(`  批量重试: 第 ${attempt} 次，延迟 ${delay}ms`);
    }
  });

  console.log(`  成功: ${batchResult.successCount}, 失败: ${batchResult.errorCount}`);
  console.log();

  // 示例4: 自定义重试条件
  console.log('4. 自定义重试条件示例:');
  try {
    const result = await promiseRetry(
      () => mockNetworkRequest('https://api.example.com/data', true),
      {
        retries: 5,
        delay: 1000,
        shouldRetry: (error, attempt) => {
          // 只重试网络错误，不重试其他类型错误
          const isNetworkError = error.message.includes('Network') || 
                                 error.message.includes('timeout');
          console.log(`  第 ${attempt} 次失败，是否重试: ${isNetworkError}`);
          return isNetworkError;
        }
      }
    );
    console.log('  成功:', result);
  } catch (error) {
    console.log('  最终失败:', error.message);
  }
  console.log();

  // 示例5: 带超时的重试
  console.log('5. 带超时的重试示例:');
  try {
    const result = await promiseRetry(
      () => mockNetworkRequest('https://slow-api.example.com', false),
      {
        retries: 3,
        delay: 1000,
        timeout: 800, // 800ms超时
        onRetry: (error, attempt, delay) => {
          console.log(`  超时重试第 ${attempt} 次`);
        }
      }
    );
    console.log('  成功:', result);
  } catch (error) {
    console.log('  最终失败:', error.message);
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    promiseRetry,
    PromiseRetrier,
    promiseRetryAll,
    retryable,
    createRetryableFunction,
    RetryError,
    TimeoutError,
    examples
  };
}

// 浏览器环境
if (typeof window !== 'undefined') {
  window.PromiseRetryUtils = {
    promiseRetry,
    PromiseRetrier,
    promiseRetryAll,
    retryable,
    createRetryableFunction,
    RetryError,
    TimeoutError,
    examples
  };
}

console.log('Promise重试工具库已加载');

// 如果直接运行此文件，执行示例
if (typeof require !== 'undefined' && require.main === module) {
  examples().catch(console.error);
}


