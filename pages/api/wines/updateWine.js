import WineDataBase from '../../../mongoDB/wine-schema'
import { withSessionAPI } from '../../../lib/session'
import getVivinoData from '../../../scraping/cheerio'
import connectMongo from '../../../mongoDB'

const handler = async (req, res) => {
  try {
    const { body } = req
    const { title, year, price, comment, archived, _id } = body
    const [img, rating, country, vivinoUrl] = await getVivinoData(title, year)

    await connectMongo()

    const response = await WineDataBase.findOneAndUpdate(
      {
        _id,
      },
      {
        title,
        country,
        year,
        price,
        comment,
        archived,
        img,
        rating,
        vivinoUrl,
      },
      {
        new: true,
      }
    )

    res.status(200).json(response)
  } catch (err) {
    console.error(err, 'wines / update wine')
    res.status(500).send()
  }
}

export default withSessionAPI(handler)
