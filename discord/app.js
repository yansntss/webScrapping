require('dotenv').config();

const Client = require('../discord/src/structures/Client')
const client = new Client({
  intents: [ //pesquisar intents de acordo com necessidade 
    'GUILDS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGES',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_MEMBERS',
    'GUILD_PRESENCES'

  ]
})
client.once('ready', () => {
  console.log('✅ - BOT ON')
})

client.on('messageCreate', (messege) => {
  console.log(messege)
})

client.login(process.env.BOT_TOKEN)