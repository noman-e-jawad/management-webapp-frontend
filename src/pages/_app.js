import Layout from '../components/Layout/Layout'
import { ThemeProvider } from '../contexts/ThemeContext'
import { UserProvider } from '../contexts/UserContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ThemeProvider>
  )
}

export default MyApp
