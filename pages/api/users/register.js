import UserDataBase from '../../../mongoDB/user-schema'
import bcrypt from 'bcryptjs'
import validateRegisterInput from '../../../validation/register'
import connectMongo from '../../../mongoDB'

const handler = async (req, res) => {
  const { name, email, password } = req.body
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    res.status(400).json(errors)
    return
  }

  await connectMongo()

  const existingUser = await UserDataBase.findOne({ email })

  if (existingUser) {
    res.status(400).json({ email: 'Email already exists' })
    return
  }

  const newUser = new UserDataBase({
    name,
    email,
    password,
    wineList: [],
  })

  bcrypt.genSalt(10, async (_, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err

      newUser.password = hash

      await newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.error(err))
    })
  })
}

export default handler
