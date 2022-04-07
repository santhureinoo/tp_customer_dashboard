import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
function MyApp({ Component, pageProps, router }: AppProps) {
  return <Layout title={pageProps.title}><Component {...pageProps} /></Layout>

}

export default MyApp
