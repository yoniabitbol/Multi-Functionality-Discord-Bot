const axios = require('axios')
const dotenv = require('dotenv')
const {Client, Intents, MessageEmbed, WebhookClient, Channel} = require('discord.js')

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
    try{
    let response = await axios.get(link + '/variants.js')
    let varArray = await response.data.variants
    let prodName = await response.data.title
    let prodImg = await (response.data.featured_image).replace(/^/,'https:')
    let prodPrice =  (((await response.data.price)/100).toString() + '.00')
    console.log(prodPrice)
    let varID = []
    let varSize = []
    for(var i =0; i< varArray.length;i++){
        varID.push(varArray[i].id)
        varSize.push(varArray[i].option1)
    }
    const embed = new MessageEmbed()
    .setColor('ab274f')
    .setTitle(prodName)
    .setThumbnail(prodImg)
    .setFields()
    .setFooter('Yoni')
    .setTimestamp()
    .setDescription(
        '\n **Price:** '+ prodPrice +'\n\n'+ variantFormatter(varID,varSize) + '\n' + blackBoxFormatter(varID)
    )
   
    webhook.send({
        embeds: [embed],
        varlist: blackBoxFormatter(varID)
    })
    }catch(err){
        console.log(err)
    }

}

function variantFormatter(vars, sizes){
    let result = ''
    for(var i = 0; i<vars.length;i++){
        result += (sizes[i].toString()+' - '+vars[i].toString()+'\n')
    }
    return result
}

function blackBoxFormatter(vars){
    let result = '```'
    for(var i = 0; i<vars.length;i++){
        result += (vars[i].toString()+'\n')
    }
    result += '```'
    return result
}

const PREFIX = '$'
client.on('messageCreate', (message) =>{

    if(message.content === "!tawl"){
        if(message.channel.id != '834242885153980426' || message.channel.id != '998445156892168212'){
            message.reply('not here mf')
        }else message.reply(`https://cdn.boob.bot/Gifs/${randomInt(1600,1900)}.gif`)
        
    }

    if(message.content.startsWith(PREFIX) && !message.author.bot){
      const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);
      
       if(args.length === 0){
        message.reply('Please enter an argument')
      }else if(args[0].includes('collections')){
        message.reply('This looks like a link to a collection. Enter a product link.')
      }else{
        args[0] = (args[0].split('?'))[0]
      }
      if(CMD_NAME === 'var'){
            try{
                getVars(args[0])
                console.log(`Webhook sent for variants on "${args[0]}" ✅`)
            }catch(err){
                message.reply('Invalid Argument')
            }
    }
    }
})

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

console.log(randomInt(1600,1900))

client.login(token);