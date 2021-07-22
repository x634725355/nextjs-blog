import Head from "next/head";
import Link from "next/link";
import BetterScroll from "better-scroll";
import React, { useState, useRef, useEffect } from "react";

import { Scroll } from "../../components/Scroll/scroll";
import Layout, { siteTitle } from "../../components/Layout/layout";
import styles from "./demo.module.css";

const emojis = [
    "👉🏼 😁 😂 🤣 👈🏼",
    "😄 😅 😆 😉 😊",
    "😫 😴 😌 😛 😜",
    "👆🏻 😒 😓 😔 👇🏻",
    "😑 😶 🙄 😏 😣",
    "😞 😟 😤 😢 😭",
    "🤑 😲 ☹️ 🙁 😖",
    "👍 👎 👊 ✊ 🤛",
    "☝️ ✋ 🤚 🖐 🖖",
    "👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼",
    "☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽",
    "🌖 🌗 🌘 🌑 🌒",
];

export default function DemoBatterScroll() {
    const [data, setData] = useState([]);
    const [mBetter, setMBatter] = useState(null);
    const scrollRef = useRef(null);

    function addData() {
        setData([...data, ...emojis]);
    }

    useEffect(() => {
        let betterScroll = new BetterScroll(scrollRef.current, {
            scrollX: true,
            probeType: 3
        });
        console.log("初始化", betterScroll);

        setMBatter(betterScroll);

        return () => setMBatter(null);
    }, []);

    return (
        <Layout>
            <Scroll direction="horizental" >
                    {
                        data.map((p, index) => {
                            return (
                                <div key={index} className={styles.contentItem} >{p}</div>
                            );
                        })
                    }
            </Scroll>
            <div className={styles.twoContent} >
                <Scroll>
                    {
                        data.map((p, index) => {
                            return (
                                <div key={index}>{p}</div>
                            );
                        })
                    }
                </Scroll>
            </div>

            <button onClick={addData} >点击增加数据</button>
        </Layout>
    );
}
