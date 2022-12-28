import bcrypt from 'bcryptjs'
import { withSessionAPI } from '../../../lib/session'
import validateLoginInput from '../../../validation/login'
import connectMongo from '../../../mongoDB'
import UserDataBase from '../../../mongoDB/user-schema'

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

    const user = await UserDataBase.findOne({ email: email.toLowerCase() })

    if (!user) {
      res.status(400).send({ message: 'Email not found' })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(400).send({ message: 'Password incorrect' })
      return
    }

    req.session.user = user.email
    await req.session.save()

    res.status(200).json(user)
  } catch (err) {
    console.log(err, 'users / login')
    res.status(500).json({ message: err.message })
  }
}

export default withSessionAPI(loginRoute)
