// 实现倒计时
// 因为js是单线程的原因，如果前面有阻塞线程的任务，那么就会导致setInterval函数延迟，这样倒计时会不准确，建议使用setTimeout代替setInterval

// 使用setTimeout的回调函数比设定的预期值更久
// 比如嵌套超时、非活动标签超时、追踪型脚本的节流、超时延迟等等

function mySetInterval(remainTime) {
    let timer = setTimeout(() => {
        console.log('mySetInterval called')
        timer = null;
        clearTimeout(timer);
        let time = remainTime - 1000;
        if(time > 0) {
            mySetInterval(time)
        }
    }, 1000);
}

mySetInterval(10000)


// 使用requestAnimationFrame：浏览器会在下一次重绘之前执行指定的函数，
// 这样可以确保回调在每一帧之间都能够得到适时的更新
function mySetInterval(remainTime, ms = 1000) {
    const now = performance.now();
    let totalTime = 0, startTime = performance.now(), executionTime = 0;
    let nextTime = ms;
    function start() {
        setTimeout(() => {
            executionTime = performance.now() - startTime;
            totalTime += executionTime;
            startTime = performance.now();
            // 计算下一次的时间间隔
            const diff = remainTime - totalTime;
            nextTime = ms - (totalTime % ms);
            // 重置初始时间
            if(diff > 0) {
                requestAnimationFrame(start);
            }
        }, nextTime);
    }
    start();
}
mySetInterval(20000);


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
