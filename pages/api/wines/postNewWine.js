import WineDataBase from '../../../mongoDB/wine-schema'
import { getVivinoData } from '../scraping/cheerio'

const handler = async (req, res) => {
  try {
    const data = JSON.parse(req.body)
    const { title, year, price, comment, shelf, column } = data
    const [img, rating, country, vivinoUrl] = await getVivinoData(title, year)
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
    res.status(500).send()
  }
}

export default handler
