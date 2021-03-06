import styles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";

import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout/layout";
import Alert from "../components/Alert/alert";
import { getSortePostsData } from "../lib/posts";
import Date from "../components/Date/date";

export default function Home({ allPostData }) {
    console.log("allPostData", allPostData);

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <Link href="/demo/demo" >
                <a href="">跳转到BatterScroll测试页面</a>
            </Link>

            <div>
                <Link href="/reduxDemo/reduxDemo" >
                    <a href="">跳转到redux测试页面</a>
                </Link>
            </div>

            <div>
                <Link href="/formDemo/formDemo">
                    <a href="">跳转到组件demo页面</a>
                </Link>
            </div>

            <div>
                <Link href="/mutualNest/mutualNest">
                    <a href="">向Nest发请求咯</a>
                </Link>
            </div>

            <section className={utilStyles.headingMd}>
                <p>Hello, I'm purifyThreeColor</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{" "}
                    <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
                </p>
            </section>

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostData.map(({ id, date, title }) => {
                        return (
                            <li className={utilStyles.listItem} key={id}>
                                <Link href={`/posts/${id}`}>
                                    <a href="">{title}</a>
                                </Link>
                                <br />
                                <small className={utilStyles.lightText}>
                                    <Date dateString={date}></Date>
                                </small>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostData = getSortePostsData();
    return {
        props: {
            allPostData,
        },
    };
};
