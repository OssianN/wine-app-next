import cheerio from 'cheerio'
// import fetch from 'node-fetch'
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'

// const getPuppeteerPage = ( title, year ) => {
//   const url = `https://www.vivino.com/search/wines?q=${title}+${year}`;
//   puppeteer.use(StealthPlugin());
//   return new Promise( async ( resolve, reject ) => {
//     try {
//       const launch =  await puppeteer
//       .launch({
//         headless: true,
//         args: [
//           "--incognito",
//           "--no-sandbox",
//           "--single-process",
//           "--no-zygote"
//         ],
//       })
//       const browser = await launch.newPage();
//       await browser.goto(url);
//       const html = await browser.content();
//       await browser.close();
//       return resolve(html);
//     } catch (err) {
//       console.error(err);
//       return reject(err);
//     }
//   })
// }

const getHtmlFromTitle = (title, year) => {
  return new Promise(async (resolve, reject) => {
    try {
      const searchTitle = title.split(' ').join('+')
      const cleanSearchTitle = searchTitle
        .normalize('NFD')
        .replace(/[\u0300-\u036f’]/g, '')
      // const vivinoSite = await getPuppeteerPage(cleanSearchTitle, year);
      const vivinoSite = await fetch(
        `https://www.vivino.com/search/wines?q=${cleanSearchTitle}+${year}`
      )
      const body = await vivinoSite.text()
      resolve(cheerio.load(body))
    } catch (err) {
      reject(err)
    }
  })
}

const getWineCountry = html => {
  try {
    const countryElement = html('.wine-card__region')
    const firstCountry = countryElement[0]
    const region = firstCountry.children[3].children[0].data
    const country = firstCountry.children[5].children[0].data
    return `${region}, ${country}`
  } catch (err) {
    return null
  }
}

const getWineImg = html => {
  try {
    const imgElement = html('.wine-card__image')
    const firstImg = imgElement[0]
    const attribute = firstImg.attribs.style
    return attribute.match(/\/\/.*(?=\))/)
  } catch (err) {
    return null
  }
}

const getWineRating = html => {
  try {
    const ratingElement = html('.average__number')
    return ratingElement[0].children[0].data
  } catch (err) {
    return 'no rating found'
  }
}

// const getWinePrice = async (html) => {
//   try {
//     const priceElement = html('.wine-price');
//     const price = priceElement[0].children[3].children[0].data;
//     const SEK = isNaN(parseInt(price)) ? 'no price found' : (parseInt(price) * 12).toString(); //convert to SEK if number
//     return SEK;
//   } catch (err) {
//     return 'no price found';
//   }
// }

const getWinePage = async html => {
  try {
    const winePage = html('.wine-card__image-wrapper')[0].children[0].next
      .attribs.href
    const vivinoLinkSite = await fetch(`https://www.vivino.com${winePage}`)
    const body = await vivinoLinkSite.text()
    const wineHtml = cheerio.load(body)
    return wineHtml('link')[32].attribs.href
  } catch (err) {
    return null
  }
}

const getVivinoData = async (title, year) => {
  try {
    const html = await getHtmlFromTitle(title, year)
    const imgURL = await getWineImg(html)
    const rating = await getWineRating(html)
    const country = await getWineCountry(html)
    // const vivinoPrice = null; // await getWinePrice(html)
    const vivinoUrl = await getWinePage(html)

    return [imgURL[0], rating, country, vivinoUrl]
  } catch (err) {
    console.error(err)
    return 'no data found'
  }
}

export default getVivinoData
