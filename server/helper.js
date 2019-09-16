function convertDataIntoGraphPoints (currencyPairsRates){

    let currencyPairsRatesDates = [];
    let currencyPairsEachName = [];

    for(let i=0;i<currencyPairsRates.length;i++){
        let initialJsonToPush = {
            name:"",
            data:[]
        }
        const name = currencyPairsRates[i].name;
        if(!isJsonKeyExistsInArray(currencyPairsEachName,"name",name)){
            initialJsonToPush.name = name;
        }
        const data = JSON.parse(currencyPairsRates[i].data);
        let arrayOfRates = [];
        for(let j=0;j<data.length;j++){
            if(currencyPairsRatesDates.indexOf(data[j].date) == -1)
                currencyPairsRatesDates.push(data[j].date);
                arrayOfRates.push(data[j].rate);
        }
        initialJsonToPush.data = arrayOfRates;
        currencyPairsEachName.push(initialJsonToPush);
    }

    return {
        currencyPairsEachName:currencyPairsEachName,
        dates:currencyPairsRatesDates
    };
}

function isJsonKeyExistsInArray(array,value,key){
    let isExists = false;
    for(let i=0;i<array.length;i++){
        if(array[i][value]==key){
            isExists = true;
        }
    }
    return isExists;
}

module.exports.convertDataIntoGraphPoints = convertDataIntoGraphPoints;