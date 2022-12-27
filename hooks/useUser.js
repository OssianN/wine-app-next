import useSwr from 'swr'
import { fetcher } from '../lib/swrFetcher'

const useUser = fallbackData => {
  const { data, mutate } = useSwr('/api/users/getLoggedInUser', fetcher, {
    fallbackData,
  })

  return { user: data?.user, mutateUser: mutate }
}

export default useUser
