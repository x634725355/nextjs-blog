import React, { forwardRef, useEffect, useRef, useState } from "react";
import { createBScroll } from "better-scroll";
import styles from "./scroll.module.css";

export interface PropTypes extends csc.Props {
    direction?: "vertical" | "horizental",// 滚动的方向
    click?: boolean,// 是否支持点击
    refresh?: boolean,// 是否刷新
    onScroll?: Function | null,// 滑动触发的回调函数
    pullUp?: Function | null,// 上拉加载逻辑
    pullDown?: Function | null,// 下拉加载逻辑
    pullUpLoading?: boolean,// 是否显示上拉 loading 动画
    pullDownLoading?: boolean,// 是否显示下拉 loading 动画
    bounceTop?: boolean,// 是否支持向上吸顶
    bounceBottom?: boolean,// 是否支持向下吸底
}

export const Scroll = forwardRef((props: PropTypes, ref) => {

    //better-scroll 实例对象
    const [bScroll, setBScroll] = useState<any>();
    //current 指向初始化 bs 实例需要的 DOM 元素 
    const scrollContaninerRef = useRef<any>();

    const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom, children } = props;
    // 事件解构
    const { pullUp, pullDown, onScroll } = props;

    const isHorizental = direction === "horizental";

    // 创建 batter-scroll
    useEffect(() => {
        const scroll = createBScroll(scrollContaninerRef.current, {
            scrollX: isHorizental,
            scrollY: !isHorizental,
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        });

        setBScroll(scroll);
        return () => {
            setBScroll(null);
        };
    }, []);

    // 给实例绑定 scroll 事件
    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on("scroll", (scroll: any) => {
            onScroll(scroll);
        });

        return () => {
            bScroll.off("scroll");
        }
    }, [onScroll, bScroll]);

    // 上拉到底的判断, 调用上拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullUp) return;

        bScroll.on("scrollEnd", () => {
            // 判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) { pullUp(); }
        });

        return () => {
            bScroll.off("scrollEnd");
        }
    }, [pullUp, bScroll]);

    // 下拉的判断, 调用下拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullDown) return;
        bScroll.on('touchEnd', (pos: any) => {
            // 判断用户的下拉动作
            if (pos.y > 50) { pullDown(); }
        });

        return () => {
            bScroll.off('touchEnd');
        };
    }, [pullDown, bScroll]);

    // 重新渲染时要刷新实例, 防止无法滑动
    useEffect(() => {
        if (refresh && bScroll) { bScroll.refresh(); }
    });

    return (
        <div className={`${styles.box} ${isHorizental ? styles.horizental : '' }`} ref={scrollContaninerRef} >
            <div className={`${isHorizental ? styles.inlineBlock : ''}`} >
                {children}
            </div>
        </div>
    );
});

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};

