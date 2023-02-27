import axios from 'axios';
const BigNumber = require('bignumber.js');
BigNumber.config({ROUNDING_MODE: BigNumber.ROUND_FLOOR })
const readline = require('readline');

async function reader(){
  let currencies:Array<string> = [];
  let uniqueCase:boolean = false;
  let rates = await getRates();
  currencies = [rates['bitcoin']['usd'], rates['ethereum']['usd'], rates['dogecoin']['usd']];

  console.log("--- Start of conversion ---", "\n")

  const rl = readline.createInterface({
    input: process.stdin,
  });
    
  rl.on('line', (line) => {
    if (uniqueCase) {
      processor(line, currencies);
    } else {
      // currencies = line.split(" ");
      uniqueCase = true;
    }
  });
  
  rl.on('close', () => {
      console.log("\n", "--- End of conversion ---");
  });
}

export function processor(line, currencies):string{
    let data:Array<string> = line.split(" ");
    let saleDecimalPlace:number = parseInt(data[1]);

    let purchaseCurrency:string = data[2];
    let coinPurchaseAmount:number = BigNumber(data[3]);
    let ethSale:number = BigNumber(data[0]);
    if (purchaseCurrency === "BTC") {
        ethSale *= BigNumber(currencies[0]).div(currencies[1]);
    } else if (purchaseCurrency === "DOGE") {
        ethSale *= BigNumber(currencies[2]).div(currencies[1]);
    }

    let saleOutput:number = (BigNumber(ethSale).times(coinPurchaseAmount)).toFixed(saleDecimalPlace);
    let output = saleOutput.toString()
    console.log(saleOutput);

    return output
}

function getRates(){
    var rates = axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd&precision=18`)
       .then(res => {
           return res.data
       })
   return rates
}

reader();