import '../styles/globals.css';
import { AppProps } from "next/app";
import { useRouter, NextRouter } from "next/router";
import { useEffect } from 'react';
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();
  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      console.log('让我康康', url, as, options);
      
      return true
    })
  }, [])
  
  
  return (
    <Provider store={store} >
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
