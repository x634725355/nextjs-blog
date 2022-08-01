import Head from "next/head";
import Link from "next/link";
import BetterScroll from "better-scroll";
import React, { useState, useRef, useEffect, useCallback } from "react";

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

const Button = React.memo(({ onClickButton, children }: any) => {
    return (
      <>
        <button onClick={onClickButton}>{children}</button>
        <span>{Math.random()}</span>
      </>
    );
})

export default function DemoBatterScroll() {
    const [data, setData] = useState([]);
    const [mBetter, setMBatter] = useState(null);
    const scrollRef = useRef(null);
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);


    function addData() {
        setData([...data, ...emojis]);
    }

    const handleClickButton2 = useCallback(() => {
        setCount2(count2 + 1);
      }, [count2]);

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

            <div>
                <Button onClickButton={() => setCount1(count1 + 1)} >Button1</Button>
                <Button onClickButton={handleClickButton2} >Button2</Button>
                <Button onClickButton={() => setCount3(count3 + 1)} >Button3</Button>
            </div>
        </Layout>
    );
}
