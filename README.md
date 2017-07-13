# An introduction to Steam Bots and JS as a whole.

This is aimed at complete beginners, but even those who know their way around JS and want to get into building Bots using Steam can benefit from reading this.

## Prerequisites

I will be using NodeJS v8.0.0, but this will work on any NodeJS version > 6. You can get [NodeJS](https://nodejs.org/en/) here, and if you already have it installed you can check your version with `node -v`.

Once you have made sure that node is installed and up-to-date, fire up cmd and navigate into your working directory with `cd X:/path/to/narnia/`.
Once there, create a .js file - the name is up to you but names like *index.js* or *main.js* are common.
Using your text-editor of choice (personal recommendation: [atom](https://atom.io/)) open up the file and write `console.log('Hello World!')`.
Now, in your console, write `node <your filename>.js`. The output should be a single line saying `Hello World!` after which the script exits.
Proceed only if you have verified that this works.

## First log-in

```javascript
const SteamUser = require('steam-user')

let client = new SteamUser() // Our to-be bot.

client.logOn() // Log on anonymously.                           

client.on('loggedOn', () => console.log(`Logged into steam anonymously.`))
```

Well that was simple, wasn't it? Still, let's go over the key parts:

### require('steam-user')
loads a module, in this case the `steam-user` module which can be installed with `npm install -g steam-user` in the console (only add the -g if you wish to install this globally).

That module has a set of *methods* and *properties* as described [here](https://github.com/DoctorMcKay/node-steam-user#steamuser) and is our 'gateway' to steam. It was created and is maintained by [DoctorMcKay](https://github.com/DoctorMcKay).

We then initialize an 'empty' SteamUser as `client`, which - in the future - will be our bot.

### Callbacks

The above code utilizes *callbacks* to achieve *asynchronicity*. In practice, this means that callbacks allow us to define a function that is executed when a particular operation finishes. In our case we wait for the client to emit the `loggedOn` event after which we execute a function that we pass as the 2nd argument.

An example use case:
```javascript
function execute(callback) { setTimeout(callback, 1000) }
// setTimeout takes a function as first argument which it executes once
// after the amount of miliseconds defined in the second argument.

execute(function () { console.log('Function finished.') })
```

It takes a while to grasp, but it's a really simple concept. When you can pass variables why not pass functions.

### Arrow functions

What might throw off even people who are familiar with JS is the arrow function shorthand ([MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)).

To better understand arrow functions consider this:
```javascript
client.on('loggedOn', () => console.log( ... ))
// is the same as:
client.on('loggedOn', () => { console.log( ... ) })
// which is the same as:
client.on('loggedOn', function () { console.log( ... ) })

// a convenient thing about the arrow syntax is, is that as long as
// a function takes only one parameter you can write it like this:
client.on('loggedOn', details => console.log(details))
```
*Arrow functions are a new technology and part of ES6.*
