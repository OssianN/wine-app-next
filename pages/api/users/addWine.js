import UserDataBase from '../../../mongoDB/user-schema'
import { withSessionAPI } from '../../../lib/session'
import connectMongo from '../../../mongoDB'

const handler = async (req, res) => {
  try {
    const { email, _id } = req.body
    await connectMongo()

    if (!email) {
      res.status(500).send()
      return
    }

    const user = await UserDataBase.findOne({ email })
    const wineList = await user.wineList

    if (wineList.some(wine => wine === _id)) {
      res.status(200).send()
      return
    }

    wineList.push(_id)
    await user.updateOne({ wineList })

    res.status(200).send()
  } catch (err) {
    console.error(err, 'users / add wine')
    res.status(500).send(err)
  }
}

export default withSessionAPI(handler)
