import { withIronSessionApiRoute } from 'iron-session/next'
import bcrypt from 'bcryptjs'
import { sessionOptions } from '../../lib/session'
import validateLoginInput from '../../validation/login'
import dbConnect from '../../mongoDB'
import UserDataBase from '../../mongoDB/user-schema'

async function loginRoute(req, res) {
  try {
    const { email, password } = await req.body
    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) {
      res.status(400).json(errors)
      return
    }

    await dbConnect()

    UserDataBase.findOne({ email }).then(user => {
      console.log(user)
      if (!user) {
        res.status(404).json({ emailnotfound: 'Email not found' })
        return
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          res.status(400).json({ passwordincorrect: 'Password incorrect' })
          return
        }

        const userData = { isLoggedIn: true, user }
        res.status(200).json(userData)
      })
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
