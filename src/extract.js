const request = require("request")
const fs = require("fs")

const gamesDB = `${__dirname}/../public/games.json`
const salesDB = `${__dirname}/../public/sales.json`
const lastUpdate = `${__dirname}/../public/lastUpdate.json`
const GRACE_TIME = 750

updateGOGGames()

async function updateGOGGames(maxPages = undefined) {
  console.info(`Retrieving information from GOG with Max Pages set to ${maxPages}`)
  console.info(` Reading DB...`)
  const gamesJSON = fs.readFileSync(gamesDB, "utf-8")

  console.info(" Obtaining games prices...")
  const gamesWithSpanishPrices = await getGames("ES", maxPages)
  const gamesWithRussianPrices = await getGames("RU", maxPages)

  console.info(" Putting everything together...")
  const newGames = joinPrices(gamesWithSpanishPrices, gamesWithRussianPrices)
  const newSales = newGames.filter(x => x.sale)

  if (gamesJSON.localeCompare(JSON.stringify(newGames)) != 0) {
    console.info(" SOME DIFFERENCES FOUND, writing to disk...")
    fs.writeFileSync(gamesDB, JSON.stringify(newGames))
    fs.writeFileSync(salesDB, JSON.stringify(newSales))
    fs.writeFileSync(lastUpdate, JSON.stringify({ last: new Date().toISOString() }))
  } else {
    console.info(" NOTHING CHANGED SINCE LAST RUN, aborting...")
  }
}

function getGames(country, maxPages) {
  console.info(`  Running extraction process for ${country}`)
  return new Promise(async (resolve, _) => {
    let page = 1, totalPages = maxPages, games = []

    do {
      if (page % 10 == 1) console.info(`   Page ${page}`)
      const result = await getGOGData(country, page)
      totalPages = totalPages || result.totalPages

      const products = result.products
        .filter(product => product.isGame)
        .map(product => {
          const mapped = {
            id: product.id,
            title: product.title,
            category: product.category,
            url: product.url,
            image: product.image,
            price: product.price.baseAmount
          }

          if (product.price.baseAmount != product.price.finalAmount) {
            mapped.sale = product.price.finalAmount
          }

          return mapped;
        })

      games = games.concat(products)
      await sleep(GRACE_TIME)
    } while (page++ != totalPages)

    resolve(games)
  })

}

function getGOGData(country, page) {
  return new Promise((resolve, reject) => {
    request(options(country, page), (error, response, body) => {
      if (error || response.statusCode == 500) {
        reject(error)
      } else if (!error && response.statusCode == 200 && IsJsonString(body)) {
        resolve(JSON.parse(body))
      } else {
        resolve({
          totalPages: 1,
          products: []
        })
      }
    })
  })
}

function options(country = "RU", page = 1) {
  return {
    url: `https://www.gog.com/games/ajax/filtered?sort=title&page=${page}`,
    headers: {
      Cookie: 'gog_lc=' + country + '_USD_en-US; path=/'
    }
  }
}

function joinPrices(gamesWithSpanishPrices, gamesWithRussianPrices) {
  return gamesWithSpanishPrices.map(game => {
    const russianGame = gamesWithRussianPrices.find(x => x.id === game.id)

    if (russianGame == undefined) {
      return null
    }

    const info = {
      id: game.id,
      title: game.title,
      category: game.category,
      url: game.url,
      image: game.image,
      price: {
        es: game.price,
        ru: russianGame.price
      }
    }

    if (game.sale != undefined) {
      info.sale = {
        es: game.sale,
        ru: russianGame.sale
      }
    }

    return info
  }).filter(x => x != null)
    .sort((a, b) => a.id - b.id)
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}