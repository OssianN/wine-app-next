import axios from 'axios'

export class FetchError extends Error {
  constructor({ message, response, data }) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }

    this.name = 'FetchError'
    this.response = response
    this.data = data ?? { message: message }
  }
}

export const fetcher = url => fetch(url).then(res => res.json())
// export default async function fetchJson(input, init) {
//   const response = await axios.get(input, init)
//   // const data = await response.json()

//   console.log({ response }, 'JSON')

//   // if (response.ok) {
//   //   return data
//   // }

//   // throw new FetchError({
//   //   message: response.statusText,
//   //   response,
//   //   data,
//   // })
// }
