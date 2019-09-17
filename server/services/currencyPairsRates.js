const db = require('../models/db');
let currencyPairsRatesModal = require('../models/currencyPairsRatesModel');
const getCurrencyPairsRates = async function(){
    try {
        const currencyModel = new currencyPairsRatesModal(db);
        const result = await currencyModel.getCurrencyPairsRatesModel();
        if(result.error){
            return {error:true,message:'Server Error',statusCode:500};
        }
        return {error:result.error,message:'Success',body:result.value};
    } catch(e) {
        return {error:true,message:'Server Error',statusCode:500};
    }

}


module.exports = {
    getCurrencyPairsRates : getCurrencyPairsRates
}