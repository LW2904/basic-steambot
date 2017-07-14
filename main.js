// npm install -g steam-user
const steamUser = require('steam-user')

// No need to install this
const readline = require('readline').createInterface({
	input: process.stdin,
  output: process.stdout
})

let client = new steamUser()
// We want to handle the code by ourselves
client.setOption('promptSteamGuardCode', false)

// Replace the below values with your data,
// or use the testing account provided by me.
let accountData = {
	accountName: 'luisregueiro',
	password: '4959516780'
}

client.logOn(accountData)

// Event which is emmited once steam needs a code
client.on('steamGuard', (domain, callback) => {
	readline.question((domain ? 'EMail' : 'Mobile') + ' code: ', code => {
		callback(code)
		readline.close()
	})
})

client.on('error', err => console.log(err))

client.on('loggedOn', () => {
	console.log('logged on')
})
