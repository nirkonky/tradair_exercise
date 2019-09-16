
const currencyPairsRatesService = require('../services/currencyPairsRates');
const helper = require('../helper');

//handler get currencyPairsRates from DB
const getCurrencyPairsRates = async function(req,res){
    const currencyPairsRates = await currencyPairsRatesService.getCurrencyPairsRates();
    if (currencyPairsRates.error) {
        return res.status(404).send({error:currencyPairsRates.error});
    } else {
        //convert the return data into required data to chart.
        let convertedDataToRet =  helper.convertDataIntoGraphPoints(currencyPairsRates.body);
        return res.json({
            body:convertedDataToRet,
            message:'Success'
        });
    }
}

module.exports = {
    getCurrencyPairsRates : getCurrencyPairsRates
}