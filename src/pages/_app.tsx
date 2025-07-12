import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthSession from "@/components/Provider/SessionProvider";
import { CounterStoreProvider } from "@/providers/counter-store-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthSession>
      <CounterStoreProvider>
        <Component {...pageProps} />
      </CounterStoreProvider>
    </AuthSession>
  );
}
