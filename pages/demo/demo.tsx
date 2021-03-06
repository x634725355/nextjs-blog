import Head from "next/head";
import Link from "next/link";
import BetterScroll from "better-scroll";
import React, { useState, useRef, useEffect } from "react";

import { Scroll } from "../../components/Scroll/scroll";
import Layout, { siteTitle } from "../../components/Layout/layout";
import styles from "./demo.module.css";

const emojis = [
    "đđŧ đ đ đ¤Ŗ đđŧ",
    "đ đ đ đ đ",
    "đĢ đ´ đ đ đ",
    "đđģ đ đ đ đđģ",
    "đ đļ đ đ đŖ",
    "đ đ đ¤ đĸ đ­",
    "đ¤ đ˛ âšī¸ đ đ",
    "đ đ đ â đ¤",
    "âī¸ â đ¤ đ đ",
    "đđŧ đđŧ đđŧ âđŧ đ¤đŧ",
    "âđŊ âđŊ đ¤đŊ đđŊ đđŊ",
    "đ đ đ đ đ",
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
        console.log("åå§å", betterScroll);

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

            <button onClick={addData} >įšåģåĸå æ°æŽ</button>
        </Layout>
    );
}
