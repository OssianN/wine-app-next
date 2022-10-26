import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../../lib/session'
import bcrypt from 'bcryptjs'

async function userRoute(req, res) {
  try {
    console.log('user index')
    if (!req.session.user) {
      res.json({
        isLoggedIn: false,
        user: null,
      })
      return
    }

    const { email, password } = await req.body

    await dbConnect()

    UserDataBase.findOne({ email }).then(user => {
      if (!user) {
        res.status(404).json({ emailnotfound: 'Email not found' })
        return
      }
      bcrypt.compare(password, user.password).then(async isMatch => {
        if (!isMatch) {
          res.status(400).json({ passwordincorrect: 'Password incorrect' })
          return
        }

        const userData = { isLoggedIn: true, user }
        req.session.user = userData
        await req.session.save()
      })
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
