const request = require('request')
const SLEEP = 750

module.exports = {
  getGOGGames
}

function getGOGGames(maxPages = undefined) {
  return new Promise(async (resolve, _) => {
    const ru = await getData("RU", maxPages)
    const es = await getData("ES", maxPages)

    const res = es.map(game => {
      const ruGame = ru.find(x => x.id == game.id)

      game.pR = {
        b: ruGame ? ruGame.p.b : -1,
        f: ruGame ? ruGame.p.f : -1
      }

      return game
    }).reduce((map, obj) => {
      map[obj.id] = obj;
      return map;
    }, []);
    resolve(res)
  })
}

function getData(country, maxPages) {
  return new Promise(async (resolve, _) => {
    let page = 1, totalPages = maxPages, games = []

    do {
      if (page != 1) await sleep(SLEEP)
      const result = await getGOGData(country, page)
      totalPages = totalPages || result.totalPages

      const products = result.products.map(product => {
        return {
          id: product.id,
          c: product.category,
          i: product.image,
          s: product.isDiscounted,
          p: {
            b: product.price.baseAmount,
            f: product.price.finalAmount
          },
          t: product.title,
          u: product.url
        }
      })

      games = games.concat(products)
    } while (page++ != totalPages)

    resolve(games)
  })

}

function getGOGData(country, page) {
  return new Promise((resolve, reject) => {
    request(options(country, page), (error, response, body) => {
      if (error || response.statusCode == 500) reject(error)
      if (!error && response.statusCode == 200) resolve(JSON.parse(body))
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}