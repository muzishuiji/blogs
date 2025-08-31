// 图片懒加载的实现方案


// 方案一：基于scroll和getBoundingClientReact 的实现
/**
 * html 代码：
 * <img class='iamge-item' lazyload='true' stc='placeholder.png' data-original='xxx.jpg' />
 * 
 */
(function scrollBehavior () {
    const viewHeight = document.documentElement.clientHeight;
    // 获取所有懒加载的element
    const eles = document.querySelectorAll('img[data-original][lazyload]');

    const lazyload = function () {
        // eles 不是一个真正的数组而是NodeList，老的浏览器不一定有forEach方法，
        // 使用Array.prototype.forEach.call确保跨浏览器一致性，确保在所有浏览器里都能正常工作
        Array.prototype.forEach.call(eles, function (item, index) {
            if(item.dataset.original === '') return;
            // 频繁读取，性能开销较大
            rect = item.getBoundingClientRect();
            // 进入视野中且没被滚上去
            if(rect.bottom >= 0 && rect.top < viewHeight) {
                (function () {
                    var img = new Image();
                    img.src = item.dataset.original;
                    item.onload = function () {
                        item.src = item.dataset.original;
                        // 移除相关属性避免重复执行
                        item.removeAttribute('data-original');
                        item.removeAttribute('lazyload');
                    }
                })();
            }
        })
    }
    // 页面加载完成或者触发滚动则触发图片加载
    window.addEventListener('scroll', lazyload);
    document.addEventListener('DOMContentLoaded', lazyload);
})();


// 方案二：Intersection Observer API
// 当元素与根元素或视口的交叉状态发生变化时，会执行该回调函数。
// 回调函数接受一个entries数组，每个entry代表一个被观察元素的交叉状态变化
(function () {
    // 在回调函数中处理交叉状态变化
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const img = entry.target;
                const originalSrc = img.dataset.original;
                if(originalSrc) {
                    img.srv = originalSrc;
                    img.removeAttribute('data-original');
                    img.removeAttribute('lazyload');
                    // 停止观察加载过的图片
                    observer.unobserve(img);
                }
            }
        })
    }

    const observer = new IntersectionObserver(callback, options);
    // targetElement: 所有需要懒加载的图片img[data-original][lazyload]
    observer.observe(targetElement);

})()

/**
 * IntersectionObserver 的优缺点：
 * 优点：
 *   - 高性能：异步执行，不阻塞主线程，性能开销极低；
 *   - 易用性：API设计简单，无需手动计算位置；
 *   - 精确控制：可通过rootMargin 和 threshold 精确控制触发时机；
 * 缺点：
 *   - 兼容性：IE浏览器不支持，需要polyfill；
 *   
 */