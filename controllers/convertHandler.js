/*
*
*
*       Complete the handler logic below
*       
*     

*/

function ConvertHandler() {
  
  this.handleFractions = function(input, draft){ 
  let firstReg=/^(\d)*(\.)?(\d)+/;    // Simplifies the getNum method by handling fraction components separately
  let fractionSymbol ="/";
  
  if (!input.includes(fractionSymbol)){
    return parseFloat(input.match(firstReg)[0]); 
  }
  
  let firstNumber = input.match(firstReg)[0];
  let result = draft.substring(1, draft.length);
  return parseFloat(firstNumber)/parseFloat(result).toFixed(5);
  }; 
  
  this.getNum = function(input) {
    let result;
    let draftResult;
    let unitOnly =/^[a-z]*$/i;
    let digitsTest = /^(\d)*/;
 
    let fractionTest = /^\d*(\.?\d+)?(\/\d*(\.?\d+)?)?[a-zA-Z]*$/; 
    if (fractionTest.test(input)){
      if (input.match(unitOnly)){
        return 1;
      }
      draftResult = input.match(fractionTest);
      result = this.handleFractions(draftResult[0], draftResult[2]);
    } else {
        return "invalid number";
    }
    return result;
  };
  
  
  this.getUnit = function(input) {
    var result="";
    let unitReg=/[a-zA-Z]/;
    for (let i=0; i < input.length; i++){
      if(unitReg.test(input[i])){
        result+=input[i];
      }
    }
    var unitArr = ["gal", "l", "lbs", "kg", "mi", "km"];
    return this.easyConvert(result.toLowerCase(), unitArr, "invalid unit");
  };
  
  
  this.easyConvert = function(inUnit, unitArray, phrase){
    // Used in getReturnUnit, spellOutUnit, and convert method to handle unit and mathematical conversions with an array of conversions matching specified unit
    var result;
    if (inUnit==="gal"){
    result=unitArray[0];     // l
    } 
    else if(inUnit==="l"){
    result=unitArray[1];     // gal  
              }
    else if(inUnit==="lbs"){
      result =unitArray[2];    // kg
            }
    else if(inUnit==="kg"){
      result=unitArray[3];  // lbs
    }
    else if(inUnit==="mi"){
      result=unitArray[4];   // km
    } else if(inUnit==="km"){
      result=unitArray[5];   // mi
    } else {
    result = phrase;
    }
    return result;
  }
  
  
  this.getReturnUnit = function(initUnit) {
    var unitArr = ["l", "gal", "kg", "lbs", "km", "mi"];
    return this.easyConvert(initUnit, unitArr, "invalid unit");
  };

  
  this.spellOutUnit = function(unit) {
    var unitArr = ["gallons", "liters", "pounds", "kilograms", "miles", "kilometers"];
    return this.easyConvert(unit, unitArr, "invalid unit");
  };
  
  
  this.convert = function(initNum, initUnit) {
    if (initNum==="invalid number " || initUnit ==="invalid unit"){
    return "invalid number";
    }
    const galToL = initNum * 3.78541;
    const lToGal = initNum * 1/3.78541;
    const lbsToKg = initNum * 0.453592;
    const kgToLbs = initNum* 1/0.453592;
    const miToKm = initNum * 1.60934;
    const kmToMi= initNum * 1/1.60934;
    let unitArr =[galToL,lToGal, lbsToKg, kgToLbs, miToKm, kmToMi]; 
    return parseFloat(this.easyConvert(initUnit, unitArr, "invalid number").toFixed(5));
  };
  
  
  this.shortenUnit = function(num, spelledOutUnit){
  if (num <= 1){
  return spelledOutUnit.substring(0, spelledOutUnit.length-1);
  }
  return spelledOutUnit;
  };
  
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    var initSpelledUnit = this.spellOutUnit(initUnit);
    var returnSpelledUnit = this.spellOutUnit(returnUnit);
    result = initNum +" "+ this.shortenUnit(initNum, initSpelledUnit) + " converts to " + returnNum + " "+ this.shortenUnit(returnNum, returnSpelledUnit); 
    return result;
  };
  
}

module.exports = ConvertHandler;


