// 实现倒计时
// 因为js是单线程的原因，如果前面有阻塞线程的任务，那么就会导致setInterval函数延迟，这样倒计时会不准确，建议使用setTimeout代替setInterval

// 使用setTimeout的回调函数比设定的预期值更久
// 比如嵌套超时、非活动标签超时、追踪型脚本的节流、超时延迟等等
// setTimeout实现一个带清除功能的setInterval
function mySetInterval(callback, interval) {
    let timer = null;
    let isClear = false;
    const recursiveTimeout = () => {
        if(isClear) return;
        callback();
        timer = setTimeout(recursiveTimeout, timeout);
    }
    timer = setTimeout(recursiveTimeout, timeout);
    return () => {
        clearTimeout(timer)
        timer = null;
        isClear = true;
    }
}
mySetInterval(() => {
    console.log('muzishuiji')
}, 1000)

// 有更准确执行时间的setInterval
function mySetInterval1(callback, delay) {
    let timerId = null;
    let isCleared = false;
    let startTime = performance.now();
    let expectedTime = startTime + delay;
    function recursiveTimeout() {
      if (isCleared) return;
      
      const currentTime = performance.now();
      // 执行回调
      callback();      
      // 更新预期时间
      expectedTime += delay;
      
      // 计算下次延迟时间，进行时间校正
      const drift = currentTime - (expectedTime - delay);
      const nextDelay = Math.max(0, delay - drift);
      console.log(nextDelay, 'nextDelay=====')
      timerId = setTimeout(recursiveTimeout, nextDelay);
    }
    
    timerId = setTimeout(recursiveTimeout, delay);
    
    return function clearMyInterval() {
      isCleared = true;
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
    };
}

function mySetInterval1(callback, delay) {
    let isClear = false;
    let timerId = null;
    let startTime = performance.now();
    let expectedTime = startTime + delay;
    function recursiveTimeout() {
        let currentTime = performance.now();
        callback();
        if(isClear) {
            return;
        }
        expectedTime += delay
        let drift = currentTime - (expectedTime - delay);
        let nextDelay = Math.max(0, delay - drift)
        timerId = setTimeout(recursiveTimeout, nextDelay);
        return function clearInterval() {
            isClear = false;
            if(timerId) {
                timerId = null;
                clearInterval(timerId)
            }
        }
    }
}
mySetInterval1(() => {
    console.log('muzishuiji')
}, 1000)

// 一个高精确度的倒计时
// 使用requestAnimationFrame：浏览器会在下一次重绘之前执行指定的函数，
// 这样可以确保回调在每一帧之间都能够得到适时的更新
function countDown(remainTime, ms = 1000) {
    let startTime = performance.now();
    let nextTime = ms;
    let totalTime = 0;
    let timerId = null;
    function start() {
        timerId = setTimeout(() => {
            let executionTime = performance.now() - startTime;
            totalTime += executionTime;
            startTime = performance.now();
            nextTime = ms - (totalTime % ms);
            let diff = remainTime - totalTime;
            console.log(diff)
            if(diff > 0) {
                requestAnimationFrame(start)
            } else {
                clearTimeout(timerId)
                timerId = null
            }
        }, nextTime);
    }
    start()
}
countDown(20000)





// 定时器组件的hook形式

import { useRef, useCallback, useEffect, useState } from 'react';

export const useCountDown = ({
    remainTime,
    ms = 1000,
    handler,
    onEnd
}) => {
    const totalTimeRef = useRef(0);
    const nextTimeRef = useRef(ms);
    const startTimeRef = useRef(performance.now());
    const countDownTimer = useRef(null);
    const [count, setCount] = useState(Math.ceil(remainTime / 1000))

    const clearTimer = useCallback(() => {
        if(countDownTimer.current) {
            clearTimeout(countDownTimer.current);
            countDownTimer.current = null;
        }
    }, []);

    const startCountDown = useCallback(() => {
        clearTimer();
        const executionTime = performance.now() - startTimeRef.current;
        totalTimeRef.current += executionTime;
        handler && handler();
        const remain = remainTime - totalTimeRef.current;
        setCount(Math.ceil(remain / 1000))
        nextTimeRef.current = ms - (totalTimeRef.current % ms);
        startTimeRef.current = performance.now();

        countDownTimer.current = setTimeout(() => {
            requestAnimationFrame(() => startCountDown())
        }, nextTimeRef.current);
    }, [remainTime]);

    useEffect(() => {
        countDownTimer.current = setTimeout(() => {
            requestAnimationFrame(() => startCountDown())
        }, nextTimeRef.current);
    }, [startCountDown]);

    useEffect(() => {
        if(count <= 0) {
            clearTimer();
            onEnd && onEnd();
        }
    }, [count])

    return {
        count
    }
}


