import UserDataBase from '../../../mongoDB/user-schema'
import { withSessionAPI } from '../../../lib/session'
import connectMongo from '../../../mongoDB'

const handler = async (req, res) => {
  try {
    const { _id, email } = req.body

    await connectMongo()

    const user = await UserDataBase.findOne({ email })
    const wineList = await user.wineList
    const newList = wineList.filter(wine => wine !== _id)
    await user.updateOne({ wineList: newList })
    const payload = {
      ...user._doc,
      wineList: newList,
    }

    req.session.user = user
    await req.session.save()

    res.status(202).send()
  } catch (err) {
    console.error(err, 'users / delete wine')
    res.status(500).send(err)
  }
}

export default withSessionAPI(handler)
