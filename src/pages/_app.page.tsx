import Header from "@/components/Header";
import AuthContextProvider from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CMS Project</title>
      </Head>
      <AuthContextProvider>
        <>
          {!appProps.router.pathname.startsWith("/auth") && <Header />}
          <Component {...pageProps} />
        </>
      </AuthContextProvider>
    </>
  );
}
