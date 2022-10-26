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

export default async function fetchJson(input, init) {
  const response = await fetch(input, init)
  const data = await response.json()

  console.log(data)

  if (response.ok) {
    return data
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  })
}
