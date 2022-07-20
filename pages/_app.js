import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={"https://0upiic7qowxk.usemoralis.com:2053/server"}
      appId={"Yhx9dbG4NriYYH2jtQnfT9w0EuKxNdcDO4asEIby"}
    >
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </MoralisProvider>
  );
}

export default MyApp;
