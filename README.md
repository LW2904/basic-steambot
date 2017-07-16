# An introduction to building Steam Bots and JS as a whole.

This is aimed at complete beginners, but even those who know their way around JS and want to get into building Bots using Steam can benefit from reading this.

*To Zen, who motivated and inspired me to write this shit.*

## Prerequisites

I will be using NodeJS v8.0.0, but this should work on any NodeJS version >6. You can get [NodeJS](https://nodejs.org/en/) here, and if you already have it installed you can check your version with `node -v`.

> Node can be used to run JS code in your console using Chrome's V8 JavaScript Engine. It's package ecosystem, npm, is the largest open source library in the world and can be used to instantly download und integrate a plethora of modules into your projects.

Once you have made sure that node is installed and up-to-date, fire up cmd and navigate into your working directory with `cd X:/path/to/narnia/`.
Once there, create a file *whatever.js* - the name is up to you but names like *index.js* or *main.js* are common.
Using your text-editor of choice (personal recommendation: [atom](https://atom.io/)) open up the file and write `console.log('Hello World!')`.
Now, in your console, write `node yourName.js`. The output should be a single line saying `Hello World!`, after which the script exits.
Proceed only if you have verified that this works.

## First log-in

```javascript
const steamUser = require('steam-user')

let client = new steamUser() // Our to-be bot.

client.logOn() // Log on anonymously.                           

client.on('loggedOn', () =>
  console.log('Logged into steam anonymously.'))
```
*Note: semicolons in JS are a funny affair, but the rule of thumb is that you can omit them all as long as all statements are followed by a line break - which is what I'm doing here.*

With the above code, we would have an anonymous connection to steam, which we could use to obtain data like steam profiles, or steam store information - anything you could do without an account.
The next step is logging into an actual account (our bot), but let's first go over the key parts of the above code and the
technologies that I used:

### let/const

To understand the importance of `let`, one must understand *scope*. There are many
technical details about this, and I will provide you 

### require('steam-user')
*Require* is a NodeJS-native function which loads a module, in this case it loads `steam-user`. These modules are a key part of NodeJS, and while you can write them yourself, millions of them can be found and installed via the Node Package Manager ([NPM](https://www.npmjs.com/)). `steam-user` is a public module which can be downloaded and installed using NPM:
`npm install -g steam-user` *The -g tag installs this module globally, omit it if you want the module to be installed locally.*

That module has a set of *methods* and *properties* as described in it's [documentation](https://github.com/DoctorMcKay/node-steam-user#steamuser) and is our 'gateway' to steam. It was created and is maintained by [DoctorMcKay](https://github.com/DoctorMcKay).

Using the modules constructor function, we initialize an 'empty' SteamUser object as `client`, which - in the future - will be our bot.

### Callbacks

The above code utilizes *callbacks* to achieve *asynchronicity*. It is important to note though, that there isn't a special thing called a 'callback' in the JavaScript language, it's just a convention for using JS functions. Instead of immediately returning some result like most functions, functions that use callbacks take some time to produce a result.

In practice, this means that callbacks allow us to define a function that is executed when a particular operation finishes. In our case we wait for the client to emit the `loggedOn` event after which we execute a function that we pass as the 2nd argument. *More such events can be found in the module docs.*

An example use case:
```javascript
// Create new function execute(function)
function execute (callback) { setTimeout(callback, 1000) }
// setTimeout(f, m):
// executes function f once after m miliseconds

execute(function () { console.log('Function finished.') })
// Output after 1 second (1000ms): Function finished
```

It takes a while to grasp, but it's a really simple concept. When you can pass variables why not pass functions?

### Arrow functions

What might throw off even people who are familiar with JS is the arrow function shorthand (read more here: [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)).

To better understand arrow functions consider this:
```javascript
client.on('loggedOn', () => console.log( ... ))
// is the same as:
client.on('loggedOn', () => { console.log( ... ) })
// which is the same as:
client.on('loggedOn', function () { console.log( ... ) })

// as long as a function only takes one parameter,
// you can omit the parenthesis
client.on('loggedOn', details => console.log(details))
```
*Arrow functions are a new technology and part of ES6.*

## Actual log-in

Now that you are somewhat familiar with the `steam-user` module, we can finally log into steam using an actual account!

I will now throw some code at your feet, but I've commented all the important parts.

```javascript
// npm install -g steam-user
const steamUser = require('steam-user')

// No need to install this
const readline = require('readline').createInterface({
	input: process.stdin,
  output: process.stdout
})

let client = new steamUser()
// We want to handle the code by ourselves.
client.setOption('promptSteamGuardCode', false)

// Replace the below values with your data,
// or use the testing account provided by me.
let accountData = {
	accountName: 'fsoc10',
	password: '2GFiWQDF4V'
}

client.logOn(accountData)

// Event which is emmited once steam needs a code
// Domain is only defined when email is needed
client.on('steamGuard', (domain, callback) => {
	readline.question((domain ? 'EMail' : 'Mobile') + ' code: ', code => {
		callback(code)
		readline.close()
	})
})

client.on('error', err => console.log(err))

client.on('loggedOn', () => {
	console.log('logged on')
  // Client/Bot is now ready
})
```

The only new concept in the above code is the `readline` module, which we use to
get the email/mobile code. It is a part of the core library and we don't have to
download it using NPM. The documentation can be found [here](https://nodejs.org/api/readline.html).

If you paid attention while reading the code you will also have noticed the
*ternary operator* ([MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)).

Consider the following example:
```javascript
// condition ? expr1 : expr2 is comparable to
// if (condition) { epr1 } else { expr2 }

let sunny = false
console.log('It is ' + (sunny ? 'sunny.' : 'not sunny.'))
// It is not sunny.
```
...and here's the ternary operator in action:
```javascript
client.on('steamGuard', (domain, callback) => {
	readline.question((domain ? 'EMail' : 'Mobile') + ' code: ', code => {
		callback(code)
		readline.close()
	})
})
```
Now, in the above case, the domain variable does only have a value if
steam requires an email code, and not a mobile code. If steam doesn't need an
email code the value will be `undefined` which JS treats like `false`.

Therefore, if the domain variable is defined the user is asked to provide
their email code, else (if the value is undefined) the mobile code is requested.

Some more stuff to read to properly understand the above code and how to re-use it:
- `node-steam-user` [*events*](https://github.com/DoctorMcKay/node-steam-user#events-) like 'steamGuard' or 'error'
- the `readline` [documentation](https://nodejs.org/api/readline.html)
- [this guide](http://callbackhell.com/) to writing async JS

Woo you made it! If you have any feedback hit me up on [steam](http://steamcommunity.com/profiles/76561198091491690)
so that we can have a chat.
