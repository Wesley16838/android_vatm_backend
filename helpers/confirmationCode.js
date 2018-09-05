/******************************************************************************
Title: confirmationCode.js
Author: Robert Hill
Date: 05/12/2018 - 05/16/2018
Code version: 1.0.0;
Location: ../helpers
-------------------------------------------------------------------------------
**This file Creates Confirmation Codes, and Reads Codes
 --RH3
******************************************************************************/
/*---------------------------------------------------------------------------*/
/******************************************************************************
        Creates Confirmation Code from and adds to JSON object

*******************************************************************************/
const seperator = "|vatm|";
/******************************************************************************/
let generateCode = function (data) {
	//Puts together value of the timeRequested
	//06/01/2018 - Mod for Confirmation Code not 
	var code = data.timeRequested + seperator + data.token;
	//var code = data.timeRequested + seperator + data.transactionId;
	// initilize buffer object
	var buff = new Buffer(code);
	// encode the token
	var base64Code = buff.toString('base64');
	//Adds the confirmationCode to the data
	data.confirmationCode = base64Code;
	//Returns Data object with generated confirmationCode string
	return data;
};

/*-----------------------------------------------------------------------------
      Reads Confirmation Code String and adds decode to a JSON object
-----------------------------------------------------------------------------*/
let deCode = function (data) {

	var buff = new Buffer(data, "base64");
	// encode the token
	var conCode = buff.toString('ascii');
	//Assigns a decoded Data Object
	var transData = {};
	//Gets the starting point of the timeRequested String
	var start = 0;
	//Gets reference to the first Character of seperator
	var end = conCode.indexOf(seperator);
	//Takes the timeRequested data and assigns it to Data Object as a string
	transData.timeRequested = conCode.slice(start, end);
	//Reassign start Get start point of transactionId
	start = end + seperator.length;
	//Get ending point of transactionId
	end = conCode.length;
	//Takes the transactionId data and assigns it
	//to the transactionId key in the User Data Object
	//as a string
	transData.transactionId = conCode.slice(start, end);
	//Returns Data object
	//with confirmationCode
	//decoded for Authentication
	return transData;
};

/******************************************************************************/

let getCode = function (data) {
	//Puts together value of the timeRequested
	var code = data.timeRequested + seperator + data.transactionId;
	// initilize buffer object
	var buff = new Buffer(code);
	// encode the token
	var base64Code = buff.toString('base64');
	//Returns confirmationCode string
	return base64Code;
};

/*******************************************************************************
                              EXPORTED MODULES
*******************************************************************************/
module.exports = {
	//reference to add Confirmation Code
	"gCode": generateCode,
	//refernece to Authenticate Confirmation code
	"cAuth": deCode,
	//reference to make a Confirmation Code string
	"makeCode": getCode
};
/*---------------------------------------------------------------------------
                              DEV SANDBOX TEST
----------------------------------------------------------------------------*/
// var test = {
// 	"transactionAmount": "7.36",
// 	"cashBackAmount": "60.16",
// 	"transactionFee": "4.00",
// 	"total": "35.07",
// 	"timeRequested": "2019-05-13 02:28:31",
// 	"transactionId": "23"
// };
//console.log(generateCode(test));

// var gtest = {
//   "timeRequested": "2019-05-13 02:28:31",
//   "transactionId" : "23"
// };
//
// console.log(getCode(gtest));
