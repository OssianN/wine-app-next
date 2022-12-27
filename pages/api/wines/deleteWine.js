import WineDataBase from '../../../mongoDB/wine-schema'
import { withSessionAPI } from '../../../lib/session'
import connectMongo from '../../../mongoDB'

const handler = async (req, res) => {
  try {
    const {
      body: { _id },
    } = req

    await connectMongo()

    await WineDataBase.findOneAndDelete({ _id })

    res.status(202).send()
  } catch (err) {
    console.log(err, 'wines / delete wine')
    res.status(500).send()
  }
}

export default withSessionAPI(handler)
