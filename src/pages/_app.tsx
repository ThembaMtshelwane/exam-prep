import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { theme } from '../chakra/theme'
import AddQuestion from '../components/admin/AddQuestion'
import Layout from "../components/layout/layout"
import AdminPage from './AdminPage'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
          <AddQuestion/>
          <AdminPage/>
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  ) 
}
