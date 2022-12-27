import UserDataBase from '../../../mongoDB/user-schema'
import bcrypt from 'bcryptjs'
import connectMongo from '../../../mongoDB'

const handler = async (req, res) => {
  const { name, email, password } = req.body
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    res.status(400).json(errors)
    return
  }

  await connectMongo()

  UserDataBase.findOne({ email }).then(user => {
    if (user) {
      res.status(400).json({ email: 'Email already exists' })
      return
    }

    const newUser = new UserDataBase({
      name,
      email,
      password,
      wineList: [],
    })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.error(err))
      })
    })
  })
}

export default handler
