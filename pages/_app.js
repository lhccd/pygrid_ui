import GlobalStyles from './../styles/GlobalStyles'
import '../styles/fonts.css'

const App = ({ Component, pageProps }) => (
  <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
)

export default App