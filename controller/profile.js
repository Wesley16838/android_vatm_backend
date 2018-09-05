/******************************************************************************
Title: Controller profile
Author: Robert Hill  = RH3;
Date: 05/06/2018
Code version: 1.0.0;
Location: ../controller
-------------------------------------------------------------------------------
 * This File has the functions for the
 * Servers reference, to Pass Requested data to the
 * Controller.
 * The Controller will Pass the
 * verified information to the Model.
 * To attempt SELECT, and UPDATE statements on the DB
 --RH3
 Last modified by RH3 -- 05/09/2018-->renamed the require to the profile Template
******************************************************************************/
//This is for reference for model functions
const model = require('../model/model');

//This is for reference for helper functions
const helper = require('../helpers/helpers');

//Format check to see if fields are formatted the Data
let f = helper.profileChecker.proCheck;

//To read token string data
let tDecode = helper.token.decode;

//To generate a token data object from String
let tCreate = helper.token.generate;

//To check a format of a token
let t = helper.profileChecker.checkToken;

/*****************************************************************************
                              SELECT / GET
*****************************************************************************/
/**
 * This is the function for the Controller
 * to try a SELECT statement for the
 * from the Model--> DB
 * //Server passing Controller a String Param // RH3 5/6/2018
 * //Controller takes JSON object // RH3 5/7/2018
 * -->Controller only takes Token // --RH3 05/08/2018
 * @param  {[type]}   data     Server data === Encrypted Token || string Param
 * @param  {Function} callback Model data
 * @return {[type]}            string || JSON object
 */
let get = function(data, callback) {
    //Decode the token --RH3 05/08/2018
    var data = tDecode(data);
    //Need to turn phoneNumber from string to integer --RH3 05/07/2018
		data.phoneNumber = Number(data.phoneNumber);
    //Check decoded token --RH3 05/08/2018
  	if (t(data)){
          //reference to model function for the controller to callback profile
          /*******************************************************************
           * Model Function reference
           * exported from the model Profile.js file
           * for the Controller
           * to pass to the Model
           *
           ********************************************************************/
          model.userProfile.get(data, function(err, result) {
              //if there is an error from the model function console Display
              if (err === 500) {
                  console.log(err);
                  //console.log("The controller was passed this: " + err + " from Model");
				          return callback(500, result);
              } else {
                  //There is no error controller added
                  //var result = result ;
                  //Console.log(result + "Controller Tested!");
                  var phoneString = result.phoneNumber;
                  //console.log(typeof phoneString);
                  result.phoneNumber = phoneString.toString();
                  //console.log(typeof result.phoneNumber);
                  return callback(200, result);
              }
          });
      } else /*Sendback format data issue*/ {
          var tryAgain = tCreate(data);
          //console.log(tryAgain);
          return callback(500, tryAgain);
      }
    };
/*******************************************************************************
                              UPDATE / PUT
*******************************************************************************/

/**
 * This is the function the Controller
 * to attempt an Update statement from the
 * for the Model-->DB
 * @param  {[type]}   data     Server data
 * @param  {Function} callback Model data || format issue
 * @return {[type]}            string || JSON object
 */
let put = function(data, callback) {
    //Check the Data
    if (f(data)) {
        //If the Data is valid assign it to the data;
        data = f(data);
        //reference to model function for the controller to callback profile
        /**
         * Model Function reference
         * exported from the model Profile.js file
         * for the Controller
         * to pass to the Model
         *
         */
        model.userProfile(data, function(err, result) {
            //if there is an error from the model function console Display
            if (err === 500) {
                console.log("The controller was passed this: " + err + " from Model");
            } else {
                //There is no error controller added
                var result = result + "Controller Tested!";
                Console.log(result);
                callback(null, result);
            }
        });
    } else /*Sendback format data issue*/ {
        var tryAgain = f(data);
        return tryAgain;
    }
};
/*******************************************************************************

                          EXPORT reference OBJECT

*******************************************************************************/
module.exports = {
    "get": get,
    "put": put
};
