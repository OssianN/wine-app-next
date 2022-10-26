import { SWRConfig } from 'swr'
import fetchJson from '../lib/fetchJson'
import { Provider } from 'react-redux'
import store from '../src/store'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: err => {
          console.error(err)
        },
      }}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  )
}

export default MyApp
