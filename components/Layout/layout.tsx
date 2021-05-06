import styles from './layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import React from 'react';
import Head from 'next/head';
import Header from "../Header/header";


const name = 'purifyThreeColor';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }: { children: React.ReactNode, home?: boolean }) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Header></Header>
            <main className={styles.container} >{children}</main>
            <footer className={styles.container} >
                {!home && (
                    <div className={styles.backToHome}>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                )}
            </footer>
     
        </div>
    )
}