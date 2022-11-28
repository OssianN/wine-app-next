import WineDataBase from '../../../mongoDB/wine-schema'
import { getVivinoData } from '../scraping/cheerio'

const handler = async (req, res) => {
  try {
    const { title, year, price, comment, archived, _id } = data
    const [img, rating, country, vivinoUrl] = await getVivinoData(title, year)
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
    res.status(500).send()
  }
}

export default handler
