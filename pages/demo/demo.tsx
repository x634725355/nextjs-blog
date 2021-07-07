import Head from "next/head";
import Link from "next/link";
import BetterScroll from "better-scroll";
import React, { useState, useRef, useEffect } from "react";

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
    const [data, setData] = useState(emojis);
    const [mBetter, setMBatter] = useState(null);
    const scrollRef = useRef(null);

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
            <div className={styles.box} ref={scrollRef} >
                <div className={styles.content} >
                    {
                        data.map(p => {
                            return (
                                <div className={styles.contentItem} >{p}</div>
                            );
                        })
                    }
                </div>
            </div>
        </Layout>
    );
}
