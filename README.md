# Multi-Functionality Discord Bot Application

Simple nodeJS application that fetches product variants for any specific product on any given shopify store, as well as live cryptocurrency price and conversion data for most popular cryptocurrencies in most fiat currencies.

## Get Started

* Clone the repository on your machine and create a file named `config.env`, where you will **store all sensitive data such as tokens and webhook URLs.**
* In the `config.env` file, create `TOKEN` and add your own bot's discord token, and `WEBHOOK_URL` which will hold the value of your channel's webhook URL.
* In a terminal in the project directory, run `npm install` to install all dependencies and packages necessary to get the script up and running.
* Finally, type the follwing command in the terminal and the bot will start running:

```bash
node bot.js
```


## Using the bot

* (Shopify Variant Scraper) In the discord channel where the webhook is connected, send the command `$var <productlink>` for any product on any shopify store and the bot will respond with an image of the product, the product name, all sizes available and their respective variants.
* (Crypto Price Fetcher) In the discord channel where the webhook is connected, send the command `$crypto <coin> <currency>` for any popular crypto currency and the bot will respond with live data about the coin fetched.

## Example Outputs

Below is an example output for a Bitcoin price lookup:

<img src="https://user-images.githubusercontent.com/46516280/200154581-0d2e759b-9498-4acf-afd6-45a098de72a0.png" width="48">

Below is an example output for a Sneaker on a Shopify store:

![image](https://user-images.githubusercontent.com/46516280/200154552-2d595e89-a3f5-4e58-808a-95352b7ddb4e.png)

APIs used in this project courtesy of [CoinGecko](https://www.coingecko.com/en/api/documentation) 🦎 and [Shopify](https://shopify.dev/api) 🛍

