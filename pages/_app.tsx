import '../styles/globals.css';
import { AppProps } from "next/app";
import { useRouter, NextRouter } from "next/router";
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();
  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      console.log('让我康康', url, as, options);
      

      return true
    })
  }, [])
  
  
  return <Component {...pageProps} />
}

export default MyApp
