// @ts-ignore
import { useRef, useState } from "react";

const VirtualList = ({ items, containerHeight, itemHeight, bufferCount = 0 }: {
    items: any;
    containerHeight: number;
    itemHeight: number;
    renderCount?: number;
    bufferCount?: number;
}) => {
    const renderCount = Math.ceil(containerHeight / itemHeight) + bufferCount;
    const scrollBoxRef = useRef<HTMLDivElement>(null);
    const [currentOffset, setCurrentOffset] = useState(0)
    const [offsetIndex, setOffsetIndex] = useState({
        start: 0,
        end: 10,
    })
    const onScrollHandler = (e: any) => {
        const scrollTop = scrollBoxRef.current?.scrollTop || 0
        let _currentOffset = scrollTop - scrollTop % itemHeight;
        // 保证偏移距离是 itemHeight的整数倍
        setCurrentOffset(_currentOffset)
        let _start =  Math.floor(scrollTop / itemHeight);
        let _end = _start + renderCount + 1;
        setOffsetIndex({
            start: _start,
            end: _end
        })
    }
    return (
        <div
            style={{
                height: containerHeight,
                position: 'relative',
                overflow: 'scroll'
            }}
            ref={scrollBoxRef}
            onScroll={onScrollHandler} >
            <div style={{ height: `${itemHeight * items.length}px`, position: 'absolute', left: 0, top: 0, right: 0 }}></div>
            <div style={{
                position: 'relative',
                left: 0, top: 0, right: 0,
                transform: `translate3d(0, ${currentOffset}px, 0)`
            }}>
                {items.slice(offsetIndex.start, offsetIndex.end).map((_: any, index: number) => (
                    <div key={index}>列表第{`${offsetIndex.start + index + 1}`}个元素</div>
                ))}
            </div>
        </div>
    )

}

export default VirtualList;

/**
 * 实现一个虚拟滚动元素的几个关键点
 * 1. 一个滚动容器，高度确定scrollContainerHeight，relative定位，监听滚动的scrollTop，确定滚动偏移距离 currentOffset，以及startIndex、endIndex；
 * 2. 一个占位容器，position：absolute，保持容器滚动，高度为itemsLength * itemHeight；
 * 3. 一个渲染容器，position relative，动态修改 transfromY的便宜距离，展示（渲染） startIndex 到 endIndex 的元素；
 */