const axios = require('axios')
const dotenv = require('dotenv')
const { Client, Intents, MessageEmbed, WebhookClient } = require('discord.js')

dotenv.config({ path: './config.env' })
const token = process.env.TOKEN

const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const webhookURL = process.env.WEBHOOK_URL
const webhook = new WebhookClient({ url: webhookURL })


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag} and ready.`);
});


async function getVars(link) {
    try {
        let response = await axios.get(link + '/variants.js')
        let varArray = await response.data.variants
        let prodName = await response.data.title
        let prodImg = await (response.data.featured_image).replace(/^/, 'https:')
        let prodPrice = (((await response.data.price) / 100).toString() + '.00')
        let varID = []
        let varSize = []
        for (var i = 0; i < varArray.length; i++) {
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
                '\n **Price:** ' + prodPrice + '\n\n' + variantFormatter(varID, varSize) + '\n' + blackBoxFormatter(varID)
            )

        webhook.send({
            embeds: [embed],
            varlist: blackBoxFormatter(varID)
        })
    } catch (err) {
        console.log(err)
    }

}

<<<<<<< HEAD

async function getCrypto(crypto, currency){
    try{
        let response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${crypto}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        let price = await response.data[0].current_price
        let name = await response.data[0].name
        let image = await response.data[0].image
        let marketCap = await response.data[0].market_cap
        let high24h = await response.data[0].high_24h
        let low24h = await response.data[0].low_24h
        let ath = await response.data[0].ath
        console.log(price)

        const embed = new MessageEmbed()
        .setColor('ab274f')
        .setTitle(name)
        .setThumbnail(image)
        .setFields()
        .setFooter('Yoni')
        .setTimestamp()
        .setDescription(
        '\n\n **Current Price: **$'+ price + '\n\n **24h-Low: **$' + low24h + '\n\n **24h-High: **$' + high24h + '\n\n **All-time high: **$' + ath + '\n\n **Market Cap: **$' + marketCap
    )
   
    webhook.send({
        embeds: [embed]
    })

    }catch(err){
        console.log(err)
    }
}

function variantFormatter(vars, sizes){
=======
function variantFormatter(vars, sizes) {
>>>>>>> 597f1d9e6ee33a2e4a5e9214c2ab57a7ed57f533
    let result = ''
    for (var i = 0; i < vars.length; i++) {
        result += (sizes[i].toString() + ' - ' + vars[i].toString() + '\n')
    }
    return result
}

function blackBoxFormatter(vars) {
    let result = '```'
    for (var i = 0; i < vars.length; i++) {
        result += (vars[i].toString() + '\n')
    }
    result += '```'
    return result
}

const PREFIX = '$'
client.on('messageCreate', (message) => {

    if (message.content === "!tawl") {
        message.reply(`https://cdn.boob.bot/Gifs/${randomInt(1600, 1900)}.gif`)
    }

<<<<<<< HEAD
    if(message.content.startsWith(PREFIX) && !message.author.bot){
      const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);
      console.log(args[0], args[1], args[2])

      if(CMD_NAME=== 'crypto'){
        try{
            getCrypto(args[0], args[1])
            console.log(`Webhook sent for ${args[0]} in ${args[1]}`)
        }catch(err){
            console.log(err)
        }
      }


       if(args.length === 0){
        message.reply('Please enter an argument')
      }else if(args[0].includes('collections')){
        message.reply('This looks like a link to a collection. Enter a product link.')
      }else{
        args[0] = (args[0].split('?'))[0]
      }
      if(CMD_NAME === 'var'){
            try{
=======
    if (message.content.startsWith(PREFIX) && !message.author.bot) {
        const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);

        if (args.length === 0) {
            message.reply('Please enter an argument')
        } else if (args[0].includes('collections')) {
            message.reply('This looks like a link to a collection. Enter a product link.')
        } else {
            args[0] = (args[0].split('?'))[0]
        }
        if (CMD_NAME === 'var') {
            try {
>>>>>>> 597f1d9e6ee33a2e4a5e9214c2ab57a7ed57f533
                getVars(args[0])
                console.log(`Webhook sent for variants on "${args[0]}" ✅`)
            } catch (err) {
                message.reply('Invalid Argument')
            }
        }
    }
})

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
<<<<<<< HEAD
  }
=======
}
>>>>>>> 597f1d9e6ee33a2e4a5e9214c2ab57a7ed57f533

client.login(token);