import WineDataBase from '../../../mongoDB/wine-schema'
import { withSessionAPI } from '../../../lib/session'
import getVivinoData from '../../../scraping/cheerio'
import connectMongo from '../../../mongoDB'

const handler = async (req, res) => {
  try {
    const { body } = req
    const { title, year, price, comment, shelf, column } = body
    const [img, rating, country, vivinoUrl] = await getVivinoData(title, year)

    await connectMongo()

    const wine = new WineDataBase({
      title,
      country,
      year,
      price,
      comment,
      shelf,
      column,
      img,
      rating,
      vivinoUrl,
    })
    const response = await wine.save()

    res.status(200).json(response)
  } catch (err) {
    console.error(err, 'wines / post new wine')
    res.status(500).send()
  }
}

export default withSessionAPI(handler)
