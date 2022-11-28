import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../../lib/session'

async function userRoute(req, res) {
  try {
    if (!req.session.user) {
      res.json({
        isLoggedIn: false,
        user: null,
      })
      return
    }

    return req.session.user
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
