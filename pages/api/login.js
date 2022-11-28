import bcrypt from 'bcryptjs'
import { withSessionAPI } from '../../lib/session'
import validateLoginInput from '../../validation/login'
import connectMongo from '../../mongoDB'
import UserDataBase from '../../mongoDB/user-schema'

const loginRoute = async (req, res) => {
  try {
    if (req.session?.user) {
      res.status(200).send(req.session.user)
    }

    const { email, password } = await req.body
    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) {
      res.status(400).json(errors)
      return
    }

    await connectMongo()
    console.log('connected to MongoDB')

    const user = await UserDataBase.findOne({ email })

    if (!user) {
      res.status(404).json({ emailnotfound: 'Email not found' })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(400).json({ passwordincorrect: 'Password incorrect' })
      return
    }

    const userData = { isLoggedIn: true, user }
    req.session.user = userData
    await req.session.save()

    res.status(200).send(userData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default withSessionAPI(loginRoute)
