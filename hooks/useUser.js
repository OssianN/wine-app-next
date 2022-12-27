import useSwr from 'swr'
import { fetcher } from '../lib/swrFetcher'

const useUser = () => {
  const { data } = useSwr('/api/users/getLoggedInUser', fetcher)
  console.log(data, 'USE USER')

  return { user: data?.user }
}

export default useUser
