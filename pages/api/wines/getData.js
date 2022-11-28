import WineDataBase from '../../../mongoDB/wine-schema'

const handler = async (req, res) => {
  try {
    const wines = await WineDataBase.find({ _id: { $in: [...wineList] } })
    res.status(200).json(wines)
  } catch (err) {
    res.status(500).send()
  }
}

export default handler
