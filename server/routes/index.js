const currencyPairsRatesHandler = require('../controllers/currencyPairsRates');
const appRoot = require('app-root-path');
module.exports = (app) => {
  // API routes
  app.use('/fetchCurrencyPairsRates',currencyPairsRatesHandler.getCurrencyPairsRates);

  app.use('*', function(req, res){
    res.sendFile(appRoot + '/tradair_exercise/client/index.html');
  });
};

