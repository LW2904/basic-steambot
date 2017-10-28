# An introduction to building Steam Bots, and JS as a whole.

_Or, 'I'll throw some code at your feet and hope you will learn something from it.'_

Please note that this is an incomplete document __by design__. It's not done yet, so it's even more incomplete, but that's beside the point. 

I say this, because I want to make it clear here that I am not trying to teach you to code properly, look at this as giving you a running start, maybe even a motication (who doesn't want to build cool steam bots), in the never ending journey of learning programming languages. I will (have to) leave out somewehat important bits and pieces, that I hope you will learn as you go.

__I want to encourage you to use external resources while reading this document__, namely the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (Mozilla Developer Network) - their JS references are excellent. Since their site is structured somewhat akwardly, it is probably the fastest to just search for 'MDN string/array/operators/whatever' in your search engine of choice. __By far not everything will be covered here, things will be explained on a 'need to know' basis.__

This document takes a rather unconventional approach to trying to teach one to code, but it is how I learned: by reading working code, reading documentation, and doing lots of googling.  This is certainly not the most efficient approach, but it allows for a lot of freedom and flexibility. Also, in my opinion, the earlier one is exposed to actual production code, best practices and coding conventions, the better.

## The basics

Even I am not cruel enough to expect you to be able to understand some random code, so here goes my take at demistifying this whole thing.

### Browser console

If you are in a browser, just press __F12__ and switch to the __Console__ tab. This should work in all recent versions of Chrome (Chromium), Firefox, and virtually any browsers that sprang out of those two.

Normally, as a developer, you would be using this tab to view the output of your JS scripts, but we can also use it to type a one-liner, and immediately get a result back, like so:

![GIF](https://i.imgur.com/gfZZD2X.gif)

While this is pretty fun to play around with, and also great for learning and discovering new things thanks to the autocompletion suggestions, we want to write bigger, more complex scripts.

Now, we could write a quick website and run our JavaScript via that (which is how it is usually used), but that's a bigger detour than I would like - we are going to use __NodeJS__ ([download](https://nodejs.org/dist/v8.8.1/node-v8.8.1-x64.msi)) to run our code. This will also be convenient later, when we will begin development of the steam bot.

### NodeJS

> Node.js® is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://developers.google.com/v8/). Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, [npm](https://www.npmjs.com/), is the largest ecosystem of open source libraries in the world.

Yes. Got that? No? Well, that's ok. What you need to know is: NodeJS can run JavaScript on your PC, on your mother's laptop, on your server, and probably also on your toaster. It's open source, runs on any modern OS, is backed by the linux foundation, and it's growing very quickly. It is mainly used on servers and as a console application, but through some pretty amazing frameworks, you can also develop sexy desktop and mobile apps with it (*cough* Discord, Atom, ...).

Once you've installed Node, go ahead and fire up a console (fastest way: Win + R, type in 'cmd'; you can just look for 'cmd' in the search tab though), and type `node`.

![](https://i.imgur.com/OiuvB8d.gif)

As you can see, in it's base form, NodeJS is just like the console tab you had open just a minute ago. (Which is not surprising, since it's pretty much the same thing, only built to run standalone.) OK, this  is pretty cool and all, but we want to get into making scripts, that run using NodeJS, don't we? Well, here goes.

### First scripts

To get started, just create a file in any directory you want and name it `index.js`. The name isn't really important, and this is just a suggestion.

Let's start out with something simple, paste the following snippet into the file:

```javascript
console.log('elliot')
```

Now, move into the directory you created the file in by doing `cd C:/your/working/directory`, and after that `node index.js` in your console (obviously, replace index.js with whatever you named your file). Predictably, you will see a single line saying 'elliot', after which the script terminates.

![](https://i.imgur.com/h1vdb4Q.gif)

Well, that was too easy now, wasn't it? How about this:

```javascript
const name = 'elliot'

function printName (name) {
    console.log(name)
}

printName(name)
```

This produces the exact same result, but it introcudes two new concepts:

- Variables ([var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)), and
- Functions ([function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))

I've added links to the relevant MDN article(s), respectively - I recommend you at least skim them, you will be using variables and functions all the time. I will not go into detail about these things here, but it is imperative that you understand the use of the above two before continuing.

Things that MDN does not cover (or, at least, only covers insufficiently) are best-practices, in this case it's a best practise to use `const` as often as possible, and to use `let` where it is not. This is to prevent unintended changes of variables that should remain constant, and to improve readability. When you define a `const` it is instantly apparent that it's value *will not change.*

```javascript
const name = 'elliot' // Is the unchangeable version of...
let name = 'elliot' // which is the block scoped version of...
var name = 'elliot'

function printName (name) { ... } // Is the same as...
const printName = function (name) { ... } // which is the same as...
const printName = (name) => { ... }
```

New thingies!

- Comments (nice and basic [guide on comments](https://www.digitalocean.com/community/tutorials/how-to-write-comments-in-javascript))
- [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

__A note on different ways to declare functions:__ There is no consistent standard on this, and in the end the best option is to just pick a ruleset and stick with it. Consistent code style should be a priority. I personally almost always use `const functionName = (arguments) => { /** code */ }`, but that's really not much more than personal preference (although it's consistent with the best practice of always preferring `const`, functions are not constants by default!).

Still here? OK, with that knowledge you should already be able to read and understand lots of JavaScript, by filling in the gaps you don't know with common sense and MDN. Still, we want you to be able to write this stuff by yourself, don't we?

### Objects

Objects in JavaScript, just as in many other programming languages, can be compared to objects in real life. The concept of objects in JavaScript can be understood with real life, tangible objects.

An object is a standalone entity, with properties and type. Compare it with a car, for example. A car is an object, with properties. A car has a color, a brand, weight, a top speed, etc. The same way, JavaScript objects can have properties, which define their characteristics.

#### Using object initializers

Consider this example:

```javascript
const car = {
  color: 'red',
  make: 'Mercedes Benz', // :^)
  year: 2013
  // ...
}
```

You would access the _properties_ of this car with a simple dot notation like so:

```javascript
console.log(car.color) // 'red'
console.log(car.year) // 2013
// And so on.
```

Note that, when not defining the object to be `const`, you can change the properties after creation, also using the dot notation:

```javascript
let car = { ... }

console.log(car.color) // 'red'
car.color = 'blue'
console.log(car.color) // 'blue'
           
// You can also do it like this, which is very useful if you only get the name of the property at runtime.
car['color'] = 'green'
console.log(car.color) // 'green'
```

#### Using a constructor function

There are other ways to create objects though, ways which add very interesting functionality, and a touch of _object-oriented programming_ to JavaScript. Consider the following example:

```javascript
function Car (color, make, year) {
  this.color = color
  this.make = make
  this.year = year
  // So far so good, nothing really exciting, or different.
  
  this.repaint = (newColor) => this.color = newColor
  // Equivalent to
  this.repaint = function (newColor) { this.color = newColor }
}

const car1 = new Car('white', 'nissan', 1997)
const car2 = new Car('blue', 'mazda', 1996)

console.log(car1.color) // 'white'
console.log(car2.color) // 'blue'

car1.respray('black')
console.log(car1.color) // 'black'
```

This will be extremely useful later on. Our bot, for example will also be such an object.

If you want to be fancy, you also use the new (introduced 2016)  `Class` keyword to do this:

```javascript
class Car {
  constructor (color, make, year) {
      this.color = color
      this.make = make
      this.year = year
  }
  
  repaint (newColor) { this.color = newColor }
}
```

---



This is it. It was really just a summary of what you would have found on MDN, but I wanted there to be at least some guidance in here.



## The Bot

Let me just throw this piece of code at you. When run, it will create and initialize an object that will serve as our bot later on. But, for now, let's go through this piece by piece.

```javascript
// npm install -g steam-user
const SteamUser = require('steam-user')
const client = new SteamUser()

// No need to install this.
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

client.setOption('promptSteamGuardCode', false)

// Replace the below values with your data,
// or use the testing account provided by me.
const accountData = {
	accountName: 'fsoc10',
	password: '2GFiWQDF4V'
}

client.logOn(accountData)

// Event which is emitted once steam needs a code.
// Domain is only defined when email is needed.
client.on('steamGuard', (domain, callback) => {
	readline.question((domain ? `EMail (@${domain})` : 'Mobile') + ' code: ', code => {
		callback(code)
		readline.close()
	})
})

client.on('error', console.error)

client.on('loggedOn', () => {
   console.log('logged on')
   // Client/Bot is now ready.
   // Any additional code would be placed here, like sending messages or trades.
})
```

OK, so lets walk through this:

1. Get some modules ('steam-user' and 'readline')

2. Set up a readline interface, using the console windows input and output streams.

3. Create a new client object

4. Set the option 'promptSteamGuardCode' to false, more on this in the 'steam-user' docs, but it really just stops steam user from automatically asking you for your code - we want to do this ourselves, and eventually generate the code by ourselves.

5. Log on to steam using the `logOn` function of our client, passing an object with account data as only argument.

6. Now were just waiting for a bunch of events to happen, namely:

   1. __steamGuard__: more on this in the docs, this gets emitted after a logon attempt, when steam needs a steam guard code.

      We handle this by asking the user a 'question', namely asking for either their email or mobile 		code. The callback of the `question` function contains the input of the user, in this case their, code, which we subsequently pass to the callback from 'steamGuard'.

   2. __error__: emitted when something goes wrong. All of these errors are basically fatal, and can't really be solved by the script itself - just log what went wrong and wait for the user to do something about it.

   3. __loggedOn__: Yay, we did it, once this is emitted our client is logged onto steam and we can do all kinds of fun stuff!

This should give you a basic idea of what the code is doing, now onto the theorethical stuff!

### Modules

Official documentation of the Modules API can be found [here](https://nodejs.org/api/modules.html). I will summarize the points that are important to us here, though.

Consider the following example:

```javascript
// ./index.js
const square = require('./square.js') // Note the './' before the filename of the module.

console.log(square(4)) // Outputs 16
```

```javascript
// ./square.js
const square = x => x * x // Note the use of arrow functions and the implicit return, here.

module.exports = square // Export the square function.
```

You can also install modules made by others, using the node package manager, or `npm`, for short.

To use it simply execute `npm install <module name>` in your working directory, and to use the module you just installed:

```javascript
const module = require('module name')
```

All modules are open source, and you can browse them [here](https://www.npmjs.com/search?q=).

Note that some modules that can be `require`d do not have to be installed, like `readline`, which is a Node core module.

### Events and Callbacks

JavaScript is an event-driven language. That's an interesting concept, and since there are many great articles on this I don't really want to spend too much time on it here.

In the above example we have it easy, since we will not be creating events, just listening to them with the `on()` function of the client object. Which brings us to callbacks, which are yet another very interesting concept to understand. Since it's an integral part to... well, virtually everything in JS, I will attempt to illustrate it.

```javascript
// Let's say we are performing web-requests here.
// It always takes some time for the server to respond, so we can't just instantly return a result, we need to wait until we get it.
function request (url, callback) {
    let data = null // Do something to get data.
    setTimeout(5000, callback, data) // This is simulating a server's response time.
}

request('https://fsoc.space', function (result) { console.log(result) })
```

`setTimeout(t, f, a)` will call the function `f` after `t` miliseconds with the arguments `a`. After

This works, because you are passing a function as an argument to another function. The called function then calls the function you passed to it, simply called `callback`, in this example.

If you can pass variables to a function, why not pass functions?

Note that line 8 could be made a lot more beautiful like so:

```javascript
request('https://fsoc.space', result => console.log(result))
// Or, if you want to be fancy:
request('https://fsoc.space', console.log)
```

Both will print out the result. Do you know why?

`console.log` is just a function in the `console` object that accepts one argument, and prints that one argument. If you pass it as callback it will be called with the result, and print it out.

### Applying this knowledge

```javascript
const SteamUser = require('steam-user')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
```

This is requiring two modules, namely the [node-steam-user](https://github.com/DoctorMcKay/node-steam-user) module, which is on npm, and the [readline](https://nodejs.org/api/readline.html) module, which is part of Node.

Both modules are documented well, and by reading their respective documentation you should be able to learn a lot about what the bot script is doing.

We then create a new client object: 

```javascript
const client = new SteamUser()
```

by calling it's constructor. Following that, two methods of the SteamUser object, which our `client` is now an instance of, get called: `setOption()` and `logOn()` . Both are in the documentation, I recommend you read that now.

We then listen for _events_. This is also well documented, and the names of the events should be self-explanatory. Note the use of callback functions.

The callback function for the `'steamGuard'` event, uses an operator you do not yet know: The __Conditional__ (ternary) operator. It is used like so: 

```javascript
let sunny = true

console.log(`It is ${sunny ? '' : 'not'} sunny.`)
// condition ? expression one, if condition is true : expression two, else
```

