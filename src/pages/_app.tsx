import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthSession from "@/components/Provider/SessionProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthSession>
      <Component {...pageProps} />
    </AuthSession>
  );
}
