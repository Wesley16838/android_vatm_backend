/******************************************************************************
Title: token.js
Author: Robert Hill, Bakhrom Botirov  = RH3, BB, TL
Date: 05/04/2018
Code version: 1.0.0;
Location: ../helpers
-------------------------------------------------------------------------------
**This file Creates Tokens, and Reads Tokens
 --RH3, BB, TL
**Modified Bakhrom Botirov
--RH3
******************************************************************************/
/*---------------------------------------------------------------------------*/
/******************************************************************************
                    Creates Token from JSON object

*******************************************************************************/
var seperator = "|mtav|";

var generate = function(data) {
 //Puts together values of the password, seperator, and phoneNumber
 var token = data.password + seperator + data.phoneNumber;
 // initilize buffer object
 var buff = new Buffer(token);
 // encode the token
 var base64Token = buff.toString('base64');
 //Returns generated base64Token String
 return base64Token;
};
/*-----------------------------------------------------------------------------
            Reads Token String and makes into JSON object
-----------------------------------------------------------------------------*/
var decode = function(encodedToken) {


 var buff = new Buffer(encodedToken, "base64");
 // encode the token
 var token = buff.toString('ascii');

 //Assigns User Data Object
 var userData = {};
 //Gets the starting point of the Password String
 var start = 0;
 //Gets reference to the first Character of seperator
 var end = token.indexOf(seperator);
 //Takes the password data and assigns
 //it to the password key in the
 //User Data Object as a string
 userData.password = token.slice(start, end);
 //Reassign start Get start point of phone Number
 start = end + seperator.length;
 //Get ending point of phone Number
 end = token.length;
 //Takes the phoneNumber data and assigns
 //it to the phoneNumber key in the
 //User Data Object as a string
 userData.phoneNumber = token.slice(start, end);

 //Turn String to Integer for phoneNumber .
 userData.phoneNumber = Number(userData.phoneNumber);
 // ******************************************************************************************************
 return userData;
};

/*******************************************************************************

                          EXPORT reference OBJECT

*******************************************************************************/

module.exports = {
 "generate": generate,
 "decode": decode
};
