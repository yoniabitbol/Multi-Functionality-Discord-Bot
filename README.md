# Multi-Functionality Discord Bot Application

Simple nodeJS application that fetches product variants for any specific product on any given shopify store, as well as live cryptocurrency price and conversion data for most popular cryptocurrencies in most fiat currencies.

## Get Started

* Clone the repository on your machine and create a file named `config.env`, where you will **store all sensitive data such as tokens and webhook URLs.**
* In the `config.env` file, create `TOKEN` and add your own bot's discord token, and `WEBHOOK_URL` which will hold the value of your channel's webhook URL.
* In a terminal in the project directory, run `npm install` to install all dependencies and packages necessary to get the script up and running.
* Finally, run `npm run dev` in the terminal and the bot will start running.

## Using the bot

* (Shopify Variant Scraper) In the discord channel where the webhook is connected, send the command `$var <productlink>` for any product on any shopify store and the bot will respond with an image of the product, the product name, all sizes available and their respective variants.
* (Crypto Price Fetcher) In the discord channel where the webhook is connected, send the command `$crypto <coin> <currency>` for any popular crypto currency and the bot will respond with live data about the coin fetched from the CoinGecko API.

