## Simple steam bot using [NodeJS](https://nodejs.org) and [node-steam-user](https://github.com/DoctorMcKay/node-steam-user).

### Prerequisites

Make sure you have NodeJS v6.10.3 or greater installed on your system (`node -v` to check).

In your working directory, do `npm install node-steam-user` to download the required module.

### First log-on

Require the module, and define variables:
```markdown
const steamuser = require('steam-user');
let client = new steamuser();

let data = {
  'accountName': 'name',
  'password': 'pass'
}
```
Add the actual log-on function, and output when the account is logged on.
```markdown
client.logOn(data);

client.on('loggedOn', () => {
  console.log('Logged on with account ' + data.accountName);
  client.setPersona(steamuser.Steam.EPersonaState.Online);
});
```
This code will run as-is - congratulations, you are now in possesion of a (very basic) steam bot.

### What now?

The `client` variable now holds a `SteamClient` object which has loads of [properties](https://github.com/DoctorMcKay/node-steam-user#properties-) and [methods](https://github.com/DoctorMcKay/node-steam-user#methods-).

You could, for example, now tell steam that you are playing games, by using the [gamesPlayed](https://github.com/DoctorMcKay/node-steam-user#gamesplayedapps-force) method:
```markdown
client.gamesPlayed(["non-steam game", 730, 440])
```
...
