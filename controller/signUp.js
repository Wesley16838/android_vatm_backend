/* --------------------------------------------------------------------
 *
 * This file is the signUp controller it will validate user input and
 * Pass valid user input to the model and insert into database, and
 * if user input inserted successfully it will generate a token and assign it
 * into data json object as token key.
 *
 *
 * Last time modified by Bakhrom Botirov @ 05/04/2018
 * Last time modified by Robert Hill @ 05/09/2018 --removed validators file require--RH3
 * --------------------------------------------------------------------*/

// get all available helpers
var helpers = require('../helpers/helpers');
// get model to make a insertion to the database
var model = require('../model/model');
// data sending template, for server.js
var userData = {
	"userId": "Not Available",
	"token": "Not Available"
};

var POST = function(data, callBack){

	var error = null;

	// If the object parsed correctly
	if (typeof data === 'object') {
		//Need to turn phoneNumber from string to integer --RH3 05/07/2018
		data.phoneNumber = Number(data.phoneNumber);
		// check if there is any error, than get the {email: 'email is not correct format!', phoneNumber: 'Phone number has to be integer'}
		var valid = helpers.profileChecker.checkToken(data); // true or false
		// is data user passed
		if(valid){
			//Need to turn phoneNumber from integer to string --RH3 05/07/2018
			data.phoneNumber = data.phoneNumber.toString();
			// pass the data to model
			model.signUp.post(data, function(err, result){
				if(err){
					// if client passed in valid data server will return "INTERNAL SERVER ERROR" error code
					error = 500;
				}else{
					// assign user id to send to client
					data.userId = result;
					// generate token using email and password
					userData.token = helpers.token.generate(data);// 1. Call the token creator 2. Create a token using "data.email" and "data.password"

					// set the status code to "CREATED"
					error = 200;
				}
				// return values of callback with proper userdata and value
				return callBack(error, userData); //check this line for correct callBack <--RH3 5/7/2018
			});

		}else{
			// if client passed in valid data server will return "NOT ACCEPTABLE" error code
			error = 406;
			return callBack(error, userData);
		}
	}else{
		// if client passed in valid data server will return "NOT ACCEPTABLE" error code
		error = 406;
		return callBack(error, userData);
	}
}

module.exports = {
	"post": POST
};
