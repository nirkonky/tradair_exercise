'use strict';
const Promise = require('bluebird');

/**
 * @constructor
 * Instantiate a user repository class.
 * @param {Object} mysqlConnection - the result of mysql.createConnection()
 */
function CurrencyPairsRatesModel(mysqlConnection) {
    this.connection = mysqlConnection;
}

/**
 * Description : fetch all currency pairs and rates from DB
 *
 *
 * OUTPUT
 * @return {JSON} value          JSON of the data.
 * @return {string} error        why the method didnt works.
 */
CurrencyPairsRatesModel.prototype.getCurrencyPairsRatesModel = async function(){
    let self = this;
    let promise =  new Promise( (resolve,reject) => {
        self.connection.query('SELECT tradair.currency_pairs.name , concat("[",group_concat(CASE WHEN tradair.rates.time_created <= tradair.rates.time_created + INTERVAL 7 DAY AND tradair.rates.time_created >= tradair.rates.time_created THEN json_object("date",tradair.rates.time_created,"rate",tradair.rates.rate) end ORDER BY tradair.rates.time_created ASC),"]") as data FROM tradair.rates JOIN tradair.currency_pairs ON tradair.currency_pairs.id = tradair.rates.currency_pair_id GROUP BY(tradair.currency_pairs.name)',
         (error,value,fields) => {
             console.log(error);
             console.log(value);
            if (error) reject(new Error(error));
            
            resolve ({error: error,value:value});
        });
    }); 

    return promise;
} 
module.exports = CurrencyPairsRatesModel;
