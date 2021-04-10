import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';

import Head from 'next/head';
import Link from 'next/link';
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

            <Alert type='success' >成功了</Alert>
            <Alert type='error' >失败了</Alert>

            <section className={utilStyles.headingMd} >
                <p>Hello, I'm purifyThreeColor</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
            </section>

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} >
                <h2 className={utilStyles.headingLg} >Blog</h2>
                <ul className={utilStyles.list} >
                    {
                        allPostData.map(({ id, date, title }) => {
                            return (
                                <li className={utilStyles.listItem} key={id} >
                                    <Link href={`/posts/${id}`} >
                                        <a href="">{ title }</a>
                                    </Link>
                                    <br />
                                    <small className={utilStyles.lightText} >
                                        <Date dateString={date} ></Date>
                                    </small>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    const allPostData = getSortePostsData();
    return {
        props: {
            allPostData
        }
    }
}
