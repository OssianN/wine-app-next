import getData from './getData'
import WineDataBase from '../../../mongoDB/wine-schema'

const handler = async (req, res) => {
  const { wineList } = req.body
  try {
    if (!wineList) {
      res.status(200).json([])
      return
    }

    const wines = await WineDataBase.find({ _id: { $in: [...wineList] } })
    res.status(200).json(wines)
  } catch (err) {
    console.error(err, 'IN GET /WINES')
    res.status(500).send(err)
  }
}

export default handler
