import { MoralisProvider } from "react-moralis";
import '../styles/globals.css'
// import "../styles/styles.module.css";


function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl={"https://0upiic7qowxk.usemoralis.com:2053/server"} appId={"Yhx9dbG4NriYYH2jtQnfT9w0EuKxNdcDO4asEIby"} >
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

export default MyApp
