import WineDataBase from '../../../mongoDB/wine-schema'
import { withSessionAPI } from '../../../lib/session'
import connectMongo from '../../../mongoDB'

const handler = async (req, res) => {
  try {
    await connectMongo()

    const wines = await WineDataBase.find({ _id: { $in: [...wineList] } })
    res.status(200).json(wines)
  } catch (err) {
    console.error(err, 'wines / get data')
    res.status(500).send()
  }
}

export default withSessionAPI(handler)
