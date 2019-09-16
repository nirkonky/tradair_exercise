'use strict';
var Promise = require('bluebird');

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
    let promise =  new Promise( (resolve) => {
        self.connection.query('SELECT tradair.currency_pairs.name , concat("[",group_concat(json_object("date",tradair.rates.time_created,"rate",tradair.rates.rate) ORDER BY tradair.rates.time_created ASC),"]") as data FROM tradair.rates JOIN tradair.currency_pairs ON tradair.currency_pairs.id = tradair.rates.currency_pair_id GROUP BY(tradair.currency_pairs.name)',
         (error,value,fields) => {
            if (error) reject(new Error(error));
            
            resolve ({error: error,value:value});
        });
    }); 

    return promise;
} 
module.exports = CurrencyPairsRatesModel;
