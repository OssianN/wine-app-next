import WineDataBase from '../../../mongoDB/wine-schema'
import { withSessionAPI } from '../../../lib/session'
import connectMongo from '../../../mongoDB'

const handler = async (req, res) => {
  const {
    body: { wineList },
  } = req
  try {
    if (!wineList) {
      res.status(200).json([])
      return
    }

    await connectMongo()

    const wines = await WineDataBase.find({ _id: { $in: [...wineList] } })
    res.status(200).json(wines)
  } catch (err) {
    console.error(err, 'wines / get user wine')
    res.status(500).send(err)
  }
}

export default withSessionAPI(handler)
