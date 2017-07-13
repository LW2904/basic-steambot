const SteamUser = require('steam-user')

let client = new SteamUser() // Our to-be bot.

client.logOn() // Log on anonymously.

client.on('loggedOn', () => console.log(`Logged into steam anonymously.`))
