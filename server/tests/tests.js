
'use strict';
let chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised'),
    Mysql = require('mysql'),
    sinon = require('sinon'),
    CurrencyPairsRatesModel = require('../models/currencyPairsRatesModel');

chai.use(chaiAsPromised);

describe('Currency Pairs Rates Model', function() {
   const mysqlConnection = Mysql.createConnection({host: 'localhost'});
   const mysqlMock = sinon.mock(mysqlConnection);
   const currencyPairsRatesModel = new CurrencyPairsRatesModel(mysqlConnection);

   it('generate new query to check if return arguments is currect', function() {
       let results = [
           { id: 0, 
            name: 'EUR/USD' ,
            data:[
                {
                    date:"2019_05_24",
                    rate:"1.445"   
                }
            ]
        }
        ];
        let expectation = mysqlMock.expects('query')
                .withArgs('SELECT tradair.currency_pairs.name , concat("[",group_concat(json_object("date",tradair.rates.time_created,"rate",tradair.rates.rate) ORDER BY tradair.rates.time_created ASC),"]") as data FROM tradair.rates JOIN tradair.currency_pairs ON tradair.currency_pairs.id = tradair.rates.currency_pair_id GROUP BY(tradair.currency_pairs.name)')
                .callsArgWith(1, null, results);
        currencyPairsRatesModel.getCurrencyPairsRatesModel().then(function(mySQLResults){
            expect(mySQLResults.error).to.equal(null);
            expect(results[0].data[0].rate).to.equal(mySQLResults.value[0].data[0].rate);
            expect(results[0].data[0].date).to.equal(mySQLResults.value[0].data[0].date);
        })
   });

   it('generate new query to check if return 2 arguments is currect', function() {
    let results = [
        { id: 0, 
         name: 'EUR/USD' ,
         data:[
             {
                 date:"2019_05_24",
                 rate:"1.445"   
             }
         ]
     },
     { id: 0, 
        name: 'EUR/ILS' ,
        data:[
            {
                date:"2019_05_24",
                rate:"1.455"   
            }
        ]
    }
     ];
     let expectation = mysqlMock.expects('query')
             .withArgs('SELECT tradair.currency_pairs.name , concat("[",group_concat(json_object("date",tradair.rates.time_created,"rate",tradair.rates.rate) ORDER BY tradair.rates.time_created ASC),"]") as data FROM tradair.rates JOIN tradair.currency_pairs ON tradair.currency_pairs.id = tradair.rates.currency_pair_id GROUP BY(tradair.currency_pairs.name)')
             .callsArgWith(1, null, results);
     currencyPairsRatesModel.getCurrencyPairsRatesModel().then(function(mySQLResults){
         expect(mySQLResults.error).to.equal(null);
         expect(results[0].data[0].rate).to.equal(mySQLResults.value[0].data[0].rate);
         expect(results[0].data[0].date).to.equal(mySQLResults.value[0].data[0].date);

         expect(results[1].data[0].rate).to.equal(mySQLResults.value[1].data[0].rate);
         expect(results[1].data[0].date).to.equal(mySQLResults.value[1].data[0].date);
     })

    });


     it('generate new query to check if return 3 arguments is currect', function() {
        let results = [
            { id: 0, 
             name: 'EUR/USD' ,
             data:[
                 {
                     date:"2019_05_24",
                     rate:"1.445"   
                 }
             ]
         },
         { id: 1, 
            name: 'EUR/BTC' ,
            data:[
                {
                    date:"2019_05_24",
                    rate:"1.4325"   
                }
            ]
        },
         { id: 2, 
            name: 'EUR/ILS' ,
            data:[
                {
                    date:"2019_05_24",
                    rate:"1.455"   
                }
            ]
        }
         ];
         let expectation = mysqlMock.expects('query')
                 .withArgs('SELECT tradair.currency_pairs.name , concat("[",group_concat(json_object("date",tradair.rates.time_created,"rate",tradair.rates.rate) ORDER BY tradair.rates.time_created ASC),"]") as data FROM tradair.rates JOIN tradair.currency_pairs ON tradair.currency_pairs.id = tradair.rates.currency_pair_id GROUP BY(tradair.currency_pairs.name)')
                 .callsArgWith(1, null, results);
         currencyPairsRatesModel.getCurrencyPairsRatesModel().then(function(mySQLResults){
             expect(mySQLResults.error).to.equal(null);
             expect(results[0].data[0].rate).to.equal(mySQLResults.value[0].data[0].rate);
             expect(results[0].data[0].date).to.equal(mySQLResults.value[0].data[0].date);
             expect(results[1].data[0].rate).to.equal(mySQLResults.value[1].data[0].rate);
             expect(results[1].data[0].date).to.equal(mySQLResults.value[1].data[0].date);
             expect(results[2].data[0].rate).to.equal(mySQLResults.value[2].data[0].rate);
             expect(results[2].data[0].date).to.equal(mySQLResults.value[2].data[0].date);
         })
    });

    it('generate new query to check if return multiple dates on 1 currency name', function() {
        let results = [
            { id: 0, 
             name: 'EUR/USD' ,
             data:[
                 {
                     date:"2019_05_24",
                     rate:"1.445"   
                 },
                 {
                    date:"2019_05_26",
                    rate:"1.345"   
                },
                {
                    date:"2019_05_27",
                    rate:"1.545"   
                }
             ]
         }
         ];
         let expectation = mysqlMock.expects('query')
                 .withArgs('SELECT tradair.currency_pairs.name , concat("[",group_concat(json_object("date",tradair.rates.time_created,"rate",tradair.rates.rate) ORDER BY tradair.rates.time_created ASC),"]") as data FROM tradair.rates JOIN tradair.currency_pairs ON tradair.currency_pairs.id = tradair.rates.currency_pair_id GROUP BY(tradair.currency_pairs.name)')
                 .callsArgWith(1, null, results);
         currencyPairsRatesModel.getCurrencyPairsRatesModel().then(function(mySQLResults){
             expect(mySQLResults.error).to.equal(null);
             expect(results[0].data[0].rate).to.equal(mySQLResults.value[0].data[0].rate);
             expect(results[0].data[0].date).to.equal(mySQLResults.value[0].data[0].date);
             expect(results[0].data[1].rate).to.equal(mySQLResults.value[0].data[1].rate);
             expect(results[0].data[1].date).to.equal(mySQLResults.value[0].data[1].date);
             expect(results[0].data[2].rate).to.equal(mySQLResults.value[0].data[2].rate);
             expect(results[0].data[2].date).to.equal(mySQLResults.value[0].data[2].date);
         })
    });

    it('generate new query to check if return multiple dates on 2 currency name', function() {
        let results = [
            { id: 0, 
             name: 'EUR/USD' ,
             data:[
                 {
                     date:"2019_05_24",
                     rate:"1.445"   
                 },
                 {
                    date:"2019_05_26",
                    rate:"1.345"   
                },
                {
                    date:"2019_05_27",
                    rate:"1.545"   
                }
             ]
         },
         { id: 0, 
            name: 'EUR/BTC' ,
            data:[
                {
                    date:"2019_05_24",
                    rate:"1.245"   
                },
                {
                   date:"2019_05_26",
                   rate:"1.145"   
               },
               {
                   date:"2019_05_27",
                   rate:"1.045"   
               }
            ]
        }
         ];
         let expectation = mysqlMock.expects('query')
                 .withArgs('SELECT tradair.currency_pairs.name , concat("[",group_concat(json_object("date",tradair.rates.time_created,"rate",tradair.rates.rate) ORDER BY tradair.rates.time_created ASC),"]") as data FROM tradair.rates JOIN tradair.currency_pairs ON tradair.currency_pairs.id = tradair.rates.currency_pair_id GROUP BY(tradair.currency_pairs.name)')
                 .callsArgWith(1, null, results);
         currencyPairsRatesModel.getCurrencyPairsRatesModel().then(function(mySQLResults){
             expect(mySQLResults.error).to.equal(null);
             expect(results[0].data[0].rate).to.equal(mySQLResults.value[0].data[0].rate);
             expect(results[0].data[0].date).to.equal(mySQLResults.value[0].data[0].date);
             expect(results[0].data[1].rate).to.equal(mySQLResults.value[0].data[1].rate);
             expect(results[0].data[1].date).to.equal(mySQLResults.value[0].data[1].date);
             expect(results[0].data[2].rate).to.equal(mySQLResults.value[0].data[2].rate);
             expect(results[0].data[2].date).to.equal(mySQLResults.value[0].data[2].date);

             expect(results[1].data[0].rate).to.equal(mySQLResults.value[1].data[0].rate);
             expect(results[1].data[0].date).to.equal(mySQLResults.value[1].data[0].date);
             expect(results[1].data[1].rate).to.equal(mySQLResults.value[1].data[1].rate);
             expect(results[1].data[1].date).to.equal(mySQLResults.value[1].data[1].date);
             expect(results[1].data[2].rate).to.equal(mySQLResults.value[1].data[2].rate);
             expect(results[1].data[2].date).to.equal(mySQLResults.value[1].data[2].date);
         })
    });
});


