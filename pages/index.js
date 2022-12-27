import React from 'react'
import Link from 'next/link'
import { withSessionSSR } from '../lib/session'

const App = () => {
  return (
    <div className="landing-page">
      <h1 className="header">This is the wine we whine about</h1>
      <div className="landing-page-link-container">
        <Link href="/register">
          <button className="landing-page__link landing-page__link--colored">
            Register
          </button>
        </Link>
        <Link href="/login">
          <button className="landing-page__link">Login</button>
        </Link>
      </div>
    </div>
  )
}

export default App

export const getServerSideProps = withSessionSSR(async ({ req }) => {
  const { user } = req.session

  if (user) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return { props: { user: null } }
})
