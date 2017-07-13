# An introduction to Steam Bots and JS as a whole.

This is aimed at complete beginners, but even those who know their way around JS and want to get into building Bots using Steam can benefit from reading this.

## Prerequisites

I will be using NodeJS v8.0.0, but this will work on any NodeJS version > 6. You can get [NodeJS](https://nodejs.org/en/) here, and if you already have it installed you can check your version with `node -v`.

## First log-in

```JavaScript
const SteamUser = require('steam-user')

let client = new SteamUser() // Our to-be bot.

client.logOn() // Log on anonymously.                           

client.on('loggedOn', () => console.log(`Logged into steam anonymously.`))
```

Well that was simple, wasn't it? Still, let's go over the code piece by piece:
`require('steam-user')` loads a module, in this case the `steam-user` module which can be installed with `npm install -g steam-user` in the console (only add the -g if you wish to install this globally).

That module has a set of *methods* and *properties* as described [here](https://github.com/DoctorMcKay/node-steam-user#steamuser) and is our 'gateway' to steam. It was created and is maintained by [DoctorMcKay](https://github.com/DoctorMcKay) who works for OPSkins (and is an awesome dude for sharing his hard work and his dedication to helping users of his modules).

What might throw off even people who are familiar with JS is the arrow function shorthand ([MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)), which I use to execute some code once the client emits `loggedOn`.

To better understand arrow functions consider this:
```JavaScript
client.on('loggedOn', () => console.log( ... ))
// is the same as:
client.on('loggedOn', () => { console.log( ... ) })
// which is the same as:
client.on('loggedOn', function () { console.log( ... ) })

// a convenient thing about the arrow syntax is, is that as long as
// a function takes only one parameter you can write it like this:
client.on('loggedOn', details => console.log(details))
```
