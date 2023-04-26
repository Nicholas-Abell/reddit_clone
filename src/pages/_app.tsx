import '../styles/globals.css';
import { theme } from '../chakra/theme';
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
