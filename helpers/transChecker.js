/******************************************************************************
Title: transChecker
Author: Robert Hill
Date: 05/12/2018
Code version: 1.0.0;
Location: ../helpers
-------------------------------------------------------------------------------
**This file check the format of values passed for transaction
* features
 --RH3
 --Last Modified --RH3
******************************************************************************/
/*---------------------------------------------------------------------------*/
/******************************************************************************/
//reference the functions to decode tokens
const token = require('./token');
//reference profileChecker for tokenCheck functions
const proToken = require('./profileChecker');
//reference to confirmation Code file
const gCode = require('./confirmationCode');
/*******************************************************************************
                                GOT Validator
--This function object to inspect the Server data isVendor value. If it does the
value will return true
*******************************************************************************/
let got = function(data) {
  //Boolean for the Validation
  var gotIsVendor = false;
  //Get the Vendor value that was passed
  var vendor = data.isVendor;
  //Get the TransactionId value that was passed
  var transId= (data.transactionId == "null") || (data.transactionId == null);
  //check the format and value of the isVendor
  if (vendor == 'true' || transId){ // Changed "typeof vendor == 'boolean' && vendor==true"
  //to "vendor=='true'" checking if the value it self is true,
  //Bakhrom Botirov @ 05/31/2018 11:30pm
  //Changed from the string 'true' to the boolean value true --RH3 06/03/2018 @ 1808 
    gotIsVendor = true;
    return gotIsVendor;
  }
  return gotIsVendor;
}

/*******************************************************************************
                                GET Validator
*******************************************************************************/
let getDataTransChecker = function(data) {
 //Boolean for the validation
 var GetPass = false;
 //Get the values that were passed
 var checkToken = data.token;
 var checkTrans = Number(data.transactionId);
 //Decrypt the token string
 var checkTokenValid = token.decode(checkToken);
 //check the values of the token
 var tokenBool = proToken.checkToken(checkTokenValid);
 if (typeof checkToken == 'string') {
  if (tokenBool) {
   //check the transactionId
   if (typeof checkTrans == 'number') {
    //It is formatted correctly
    GetPass = true;
    //console.log("I am here");
    return GetPass;
   } else /*Transaction ID is not formatted correctly*/ {
    console.log("The Transcation ID is not a number");
   }
  } else /*the decoded token is not correctly formatted*/ {
   console.log("Token value not correctly formatted");
  }
 } else /*The value in the token was not a string*/ {
  console.log("Token value not an encrypted string");
 }
 return GetPass;
};
/*******************************************************************************
                                PUT Validator
--------------------------------------------------------------------------------
    * // * transcationId j/
      // * trasactionAmount e/ transAmount
    * // * cashBackAmount f/ cash
    * // * transactionFee g/ transFee
    * // * total h/ totalT
    * // * timeRequested * a/ requested
    * // * timeDelivered --> null * b/ delivered
    * // * confirmationCode --> string * cd/ code
    * // * isCancelled ?
    -------------------------------------------------------------------------
    Ugly but functional!!! --RH3 05/13/2018
*******************************************************************************/
let putDataTransChecker = function(data) {
 ///////////////////////////////////////////////////////////////////////////////
 //timeRequested////////////////////////////////////////////////////////////////
 //get data timeRequested
 var a = data.timeRequested;
 //check the timeRequested value
 var requested = (new Date(a)).getTime() > 0;
 ////////////////////////////////////////////////////////////////////////////////
 //timeDelivered////////////////////////////////////////////////////////////////
 //get data timeDelivered
 var b = data.timeDelivered;
 //check the timeDelivered value
 var delivered = true; //(b == null || (new Date(b)).getTime() > 0);
 ////////////////////////////////////////////////////////////////////////////////
 //confirmationCode/////////////////////////////////////////////////////////////
 //get data confirmationCode
 var c = data.confirmationCode;
 //check the confirmationCode
 var confirm = gCode.cAuth(c);
 //get data confirmationCode timeRequested
 var d = confirm.timeRequested;
 //Verify timeRequested against the confirmationCode
 //and check the format of the confirmationCode
 var code = true; //(a == d || (new Date(d)).getTime() > 0);
 ///////////////////////////////////////////////////////////////////////////////
 //transactionAmount////////////////////////////////////////////////////////////
 //get data transactionAmount
 var e = data.transactionAmount;
 //turn transaction into a number
 e = Number(data.transactionAmount);
 //Regex for the Decimal amount 💩
 var z = /^\d+(\.\d{1,2})?$/;
 //check the transactionAmount format
 var transAmount = (typeof e == 'number' && (z.test(e)));
 ///////////////////////////////////////////////////////////////////////////////
 //cashBackAmount///////////////////////////////////////////////////////////////
 //get cashBackAmount
 var f = data.cashBackAmount;
 //turn cashBackAmount into a number
 f = Number(data.cashBackAmount);
 //check the cashBackAmount format
 var cash = (typeof f == 'number' && (z.test(f)));
 ///////////////////////////////////////////////////////////////////////////////
 //transactionFee///////////////////////////////////////////////////////////////
 //get data transactionFee
 var g = data.transactionFee;
 //turn transactionFee into number
 g = Number(data.transactionFee);
 //check the transactionFee
 //Regex the Decimal amount 💩
 // 💩 = RegExp(/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/);
 //check the transactionFee format
 var transFee = (typeof g == 'number' && (z.test(g)));
 ///////////////////////////////////////////////////////////////////////////////
 //total////////////////////////////////////////////////////////////////////////
 //get data total
 var h = data.total;
 //turn data total into number
 h = Number(data.total);
 //check the total
 //Regex the Decimal amount 💩
 // 💩 = RegExp(/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/);
 //check the total format
 var totalT = (typeof h == 'number' && (z.test(h)));
 //////////////////////////////////////////////////////////////////////////////
 //transactionId///////////////////////////////////////////////////////////////
 //get data transactionId
 var j = data.transactionId;
 //turn data transactionId into number
 h = Number(data.transactionId);
 //check the transactionId
 //verify previous data confirmationCode transactionId
 var transH = Number(confirm.transactionId);
 //Verify data transactionId with the confirmationCode registered
 //and check the format of the confirmationCode
 var transCid = true; //(typeof h == 'number' && h == transH);
 //--------------------------------------------------------------------------//
 //run Validation function ////////////////////////////////////////////////////
 //--------------------------------------------------------------------------//
 ///Bools of checks
 let put_Check = [
  requested,
  delivered,
  code,
  transAmount,
  transFee,
  cash,
  totalT,
  transCid
 ];
 ///labels for checks
 let this_Check = [
  "requested",
  "delivered",
  "code",
  "transAmount",
  "transFee",
  "cash",
  "totalT",
  "transCid"
 ];
 ///verify counts
 var proof = 0;
 ///Loop through the array of bools
 for (var i = 0; i < put_Check.length; i++) {
  if (put_Check[i]) {
   proof++;
  } else /*Any of the inrofmation is false*/ {
   console.log("Error #" + i + " found " + put_Check[i] +
    " in validation " + this_Check[i] + " is not validating");
   //return false;
  }
 };
 return (proof == put_Check.length);
}; //End of PUT validation function;

/*******************************************************************************
                                POST Validator INSERT
--------------------------------------------------------------------------------
    * // * transcationId --> null j/
    * // * trasactionAmount e/ transAmount
    * // * cashBackAmount f/ cash
    * // * transactionFee g/ transFee
    * // * total h/ totalT
    * // * timeRequested  a/ requested
    * // * timeDelivered --> null * b/ delivered
    * // * confirmationCode --> null * cd/ code
    * // * isCancelled ?
    -------------------------------------------------------------------------
    Ugly but functional!!! --RH3 05/13/2018
*******************************************************************************/
let postDataTransChecker = function(data) {
 //////////////////////////////////////////////////////////////////////////////
 //timeRequested///////////////////////////////////////////////////////////////
 //get data timeRequested
 var a = data.timeRequested;
 //check the timeRequested value
 var requested = (new Date(a)).getTime() > 0;
 //////////////////////////////////////////////////////////////////////////////
 //timeDelivered///////////////////////////////////////////////////////////////
 //get data timeDelivered
 var b = data.timeDelivered;
 //check the timeDelivered value
 var delivered = (b == null);
 //////////////////////////////////////////////////////////////////////////////
 //confirmationCode////////////////////////////////////////////////////////////
 //get data confirmationCode
 var c = data.confirmationCode;
 //check to make sure data
 //confirmationCode does not exist.
 var code = (c == null || c == 'undefined');
 //////////////////////////////////////////////////////////////////////////////
 //transactionAmount///////////////////////////////////////////////////////////
 //get data transactionAmount
 var e = data.transactionAmount;
 //turn transaction into a number
 e = Number(data.transactionAmount);
 //Regex for the Decimal amount 💩
 var z = /^\d+(\.\d{1,2})?$/;
 //check the transactionAmount format
 var transAmount = (typeof e == 'number' && (z.test(e)));
 //////////////////////////////////////////////////////////////////////////////
 //cashBackAmount//////////////////////////////////////////////////////////////
 //get cashBackAmount
 var f = data.cashBackAmount;
 //turn cashBackAmount into a number
 f = Number(data.cashBackAmount);
 //check the cashBackAmount format
 var cash = (typeof f == 'number' && (z.test(f)));
 //////////////////////////////////////////////////////////////////////////////
 //transactionFee//////////////////////////////////////////////////////////////
 //get data transactionFee
 var g = data.transactionFee;
 //turn transactionFee into number
 g = Number(data.transactionFee);
 //check the transactionFee
 //Regex the Decimal amount 💩
 // 💩 = RegExp(/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/);
 //check the transactionFee format
 var transFee = (typeof g == 'number' && (z.test(g)));
 //////////////////////////////////////////////////////////////////////////////
 //total///////////////////////////////////////////////////////////////////////
 //get data total
 var h = data.total;
 //turn data total into number
 h = Number(data.total);
 //check the total
 //Regex the Decimal amount 💩
 // 💩 = RegExp(/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/);
 //check the total format
 var totalT = (typeof h == 'number' && (z.test(h))); //is number
 //////////////////////////////////////////////////////////////////////////////
 //transactionId///////////////////////////////////////////////////////////////
 //get data transactionId
 var j = data.transactionId;
 //check to make sure the transactionId is empty
 var transCid = (typeof j == 'undefined' || j == null); //null
 //--------------------------------------------------------------------------//
 //run Validation function ////////////////////////////////////////////////////
 //--------------------------------------------------------------------------//
 ///Bools of checks
 let post_Check = [
  requested,
  delivered,
  code,
  transAmount,
  transFee,
  cash,
  totalT,
  transCid
 ];
 ///labels for checks
 let this_Check = [
  "time requested",
  "time delivered",
  "Confirmation code",
  "transAmount",
  "transaction Fee",
  "cashBackAmount",
  "totalT",
  "transactionId"
 ];
 ///verify counts
 var proof = 0;
 ///Loop through the array of bools
 for (var i = 0; i < post_Check.length; i++) {
  //console.log(put_Check[i]);
  if (post_Check[i]) {

   proof++;
  } else /*Any of the inrofmation is false*/ {
   console.log("Error #" + i + " found " + post_Check[i] +
    " in validation " + this_Check[i] + " is not validating");
   //return false;
  }
 };
 return (proof == post_Check.length);
}; //End of PUT validation function;
/*******************************************************************************
                              EXPORTED MODULES
*******************************************************************************/
module.exports = {
 "select": getDataTransChecker,
 "update": putDataTransChecker,
 "insert": postDataTransChecker,
 "got"   : got
};
//*****************************************************************************
//*************DEV TEST Sandbox************************************************
//*****************************************************************************
// var test =  {
//   "transactionAmount": '7.36',
//   "cashBackAmount": '60.16',
//   "transactionFee": '4.00',
//   "total": '35.07',
//   "timeRequested": '2019-05-13 02:28:31',
//   "transactionId": null, //'23',
//   "confirmationCode": null, //'MjAxOS0wNS0xMyAwMjoyODozMXx2YXRtfDIz'
// 	};
//
//
// console.log(postDataTransChecker(test));
