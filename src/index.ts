import axios from 'axios';
const BigNumber = require('bignumber.js');
BigNumber.config({ROUNDING_MODE: BigNumber.ROUND_FLOOR })
const readline = require('readline');


export async function reader(){
    let uniqueCase:boolean = false;
    let currencies:Array<string> = [];
    let output:Array<number> = [];

    let rates = await getRates();
    currencies = [rates['bitcoin']['usd'], rates['ethereum']['usd'], rates['dogecoin']['usd']];

    console.log("--- Start of conversion ---", "\n")

    const rl = readline.createInterface({
        input: process.stdin,
      });
      
    rl.on('line', (line) => {
      if (uniqueCase) {
        let data:Array<string> = line.split(" ");
        let saleDecimalPlace:number = parseInt(data[1]);

        let purchaseCurrency:string = data[2];
        let coinPurchaseAmount:number = BigNumber(data[3]);
        let ethSale:number = BigNumber(data[0]);

        if (purchaseCurrency === "BTC") {
            console.log(currencies)
            ethSale *= BigNumber(currencies[0]).div(currencies[1]);
        } else if (purchaseCurrency === "DOGE") {
            ethSale *= BigNumber(currencies[2]).div(currencies[1]);
        }

        let saleOutput:number = (BigNumber(ethSale).times(coinPurchaseAmount)).toFixed(saleDecimalPlace);
        output.push(saleOutput)
        console.log(saleOutput);

      } else {
        // currencies = line.split(" ");
        uniqueCase = true;
      }

    });

    rl.on('close', () => {
        console.log("\n", "--- End of conversion ---");
        console.log(output)
    });
}

function getRates(){
    var rates = axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd&precision=18`)
       .then(res => {
           return res.data
       })
   return rates
}

reader()
