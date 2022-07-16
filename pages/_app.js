import { MoralisProvider } from "react-moralis";
import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import "../styles.css";


function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl={"https://y6tqolkxe9bh.usemoralis.com:2053/server"} appId={"k4GVITLUsGexx9lCKJcO1ioJaXwdCIUKuQCb57sp"} >
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

export default MyApp
