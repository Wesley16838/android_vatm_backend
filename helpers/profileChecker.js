/******************************************************************************
Title: profileChecker
Author: Robert Hill  = RH3;
Date: 05/05/2018
Code version: 1.0.0;
Location: ../helpers
-------------------------------------------------------------------------------
 * This file has a function
 * to Check the format type
 * of values being passed
 * in an Object.
 --RH3
 --Modified RH3 : line#39, #79 accept phoneNumber as string --RH3 06/12/2018
//---------------------------------------------------------------------------
******************************************************************************/
const token = require('./token');
/*Function to Regex email and lowercase it*/
var formatEmail = function (email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (re.test(String(email).toLowerCase()));
}
/*******************************************************************************
                                Token Validator
*******************************************************************************/
/*/------------------------------------------------------------------------------
This function will Check the
format of a Token object
and return true or false
--RH3 05/07/2018
Added boolean variable checked <--RH3 05/08/2018
--Last modified RH3 : line#39 accept phoneNumber as string --RH3 06/12/2018
//-----------------------------------------------------------------------------*/

var tokenCheck = function (data) {
  var checked = false;

      //Check the data password ? String : False
      if(typeof data.password === 'string'){
      //Check the data phoneNumber ? String : False
        if(typeof data.phoneNumber === 'number' || typeof data.phoneNumber === 'string' &&
          data.phoneNumber.toString().length >= 10 && //validate.length == 10
          data.phoneNumber.toString().length <= 14 &&
          data.phoneNumber !== NaN){
          //ok data is formatted
          //console.log("This "+ typeof data + "--has been checked.");
          checked = true;
        }/*phone*/ else {
          console.log("phoneNumber "+ data.phoneNumber + " is not formatted correctly");
          return checked;
        }
      }/*password*/ else {
        console.log("Password "+ data.password + "is not formatted correctly");
        return checked;
      }
      return checked;
};

/*******************************************************************************
                                Profile Validator
*******************************************************************************/

/* Test */
var proCheck = function (data) {
  //This reference to validate "phoneNumber":"User Input(integer)",  //validate.length == 10
  var phoneNumber = data.phoneNumber;
  /*Tests*/
  //Check the data type
  if (typeof data === 'object'){
    //Check the data email ? string && regex : False
    if(typeof data.email === 'string' && formatEmail(data.email)){
      //Check the data firstName  ? String : False
      if(typeof data.firstName === 'string'){
        //Check the data lastName ? String : False
        if (typeof data.lastName === 'string' && data.lastName == data.lastName.trim() && data.lastName != /^\s*$/.test(data.lastName)){
          //Check the data password ? String : False
          if(typeof data.password === 'string'){
            //Check the data phoneNumber ? String : False
            if(typeof data.phoneNumber === 'number' || typeof data.phoneNumber === 'string' && data.phoneNumber.toString().length >= 10 && data.phoneNumber.toString().length <= 14){
              //data is formatted
              console.log("This "+ typeof data + "--has had its format checked.");
              return true;
            }/*phone*/ else {
              console.log("phoneNumber "+ data.phoneNumber + " is not formatted correctly");
              return false;
            }
          }/*password*/ else {
            console.log("Password "+ data.password + "is not formatted correctly");
            return false;
          }
        }/*lastName*/ else {
          console.log("lastName "+ data.lastName + "is not formatted correctly");
          return false;
        }
      }/*firstName*/ else {
        console.log("firstName "+ data.firstName +" is not in a valid format");
        return false;
      }
    }/*email*/ else {
      console.log("Email "+ data.email +" is not a valid format");
      return false;
    }
  } /*data*/ else {
    console.log("The " + typeof data + "is not accepted in this system");
    return false;
  }
}

/*******************************************************************************

                          EXPORT reference OBJECT

*******************************************************************************/
module.exports = {
  "proCheck" : proCheck,
  "checkToken" : tokenCheck
};
