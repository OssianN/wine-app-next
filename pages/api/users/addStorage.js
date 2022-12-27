import UserDataBase from '../../../mongoDB/user-schema'
import { withSessionAPI } from '../../../lib/session'
import connectMongo from '../../../mongoDB'

const handler = async (req, res) => {
  try {
    const { email, columns, shelves } = req.body

    await connectMongo()

    const user = await UserDataBase.findOne({ email })
    await user.updateOne({ columns, shelves })
    const payload = {
      ...user._doc,
      columns,
      shelves,
    }

    req.session.user = user
    await req.session.save()

    res.status(200).send(user)
  } catch (err) {
    console.error(err, 'users / add storage')
    res.status(500).send(err)
  }
}

export default withSessionAPI(handler)
