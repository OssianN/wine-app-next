import WineDataBase from '../../../mongoDB/wine-schema'


const handler = async (req, res) => {
  try {
    const data = JSON.parse(req.body)
    const { _id } = data
    await WineDataBase.findOneAndDelete({ _id })

    res.status(202).send()
  } catch (err) {
    res.status(500).send()
  }
}

export default handler
