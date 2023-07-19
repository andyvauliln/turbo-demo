import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function MyApp2({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
