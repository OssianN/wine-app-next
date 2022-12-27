import bcrypt from 'bcryptjs'
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

    req.session.user = user
    await req.session.save()

    res.status(200).json(user)
  } catch (err) {
    console.log(err, 'users / login')
    res.status(500).json({ message: err.message })
  }
}

export default loginRoute
