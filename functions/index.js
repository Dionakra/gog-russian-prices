const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { getGOGGames } = require('./gog')
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gogrussianprices.firebaseio.com"
});

exports.getGOGGames = functions.pubsub.schedule('0 1,5,9,13,17,21 * * *').onRun(async (context) => {
  const games = await getGOGGames()
  await admin.database().ref("/products").set(games)
  await admin.database().ref("/sales").set(games.filter(g => g.s == true))
  await admin.database().ref("/lastRun").set(new Date().toISOString())
});