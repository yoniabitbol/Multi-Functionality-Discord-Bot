const axios = require('axios')
const dotenv = require('dotenv')
const {Client, Intents, MessageEmbed, WebhookClient} = require('discord.js')

dotenv.config({path:'./config.env'})
const token = process.env.TOKEN

const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    });

const webhookURL = process.env.WEBHOOK_URL
const webhook = new WebhookClient({url: webhookURL})


client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag} and ready.`);
});


async function getVars(link){
    let response = await axios.get(link + '/variants.js')
    let varArray = await response.data.variants
    let prodName = await response.data.title
    let prodImg = await (response.data.featured_image).replace(/^/,'https:')
    let varID = []
    let varSize = []
    for(var i =0; i< varArray.length;i++){
        varID.push(varArray[i].id)
        varSize.push(varArray[i].option1)
    }
    console.log(varSize)

    const embed = new MessageEmbed()
    .setTitle(prodName)
    .setThumbnail(prodImg)
    .setTimestamp()
    .setDescription(
        variantFormatter(varID,varSize)
    )

    webhook.send({
        embeds: [embed]
    })

    console.log(variantFormatter(varID, varSize))
    
}

function variantFormatter(vars, sizes){
    let result = ''
    for(var i = 0; i<vars.length;i++){
        result += (sizes[i].toString()+' - '+vars[i].toString()+'\n')
    }
    return result
}

const PREFIX = '$'
client.on('messageCreate', (message) =>{
    if(message.content.startsWith(PREFIX)){
      const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);
      getVars(args[0])
    }else if(false){
       message.reply('Please enter a valid link')
    }
})


client.login(token);