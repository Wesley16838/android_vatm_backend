/**
 * This file is used for the Controllers
 * login function
 *
 * Author: Ruvim Kuzmik
 * Last Data Modified: 5/22/2018
 * Last Modified: 06/09/2018 --RH3
 * Last Modified: 06/11/2018 --RH3
 *
 */
// get all available helpers
var helpers = require('../helpers/helpers');
// get model to make a insertion to the database
var model = require('../model/model');

var POST = function(data, callback) {
		var token = "Not Authorized";
		data.token = token;
		// Check if the infomation passed is formatted correctly as a token
		var valid = helpers.profileChecker.checkToken(data); // true or false
		// is data user passed
		if (valid) {
			//Need to turn phoneNumber from integer to string
			//data.phoneNumber = data.phoneNumber.toString();

			// pass the data to model
			model.login.post(data, function(err, result){
				//if(callback) {
				if (err === 500 || result == null) {
					// if client passed invalid data server will return "INTERNAL SERVER ERROR" error code
					console.log(result);

					return callback (500, data);
				} else {
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					// generate token using phoneNumber and password
					//add the Token to the object
					data.token = helpers.token.generate(result);// 1. Call the token creator 2. Create a token using "data.phoneNumber" and "data.password"
					delete data["phoneNumber"];
					delete data["password"];
		 			// set the status code to "CREATED"
					return callback(200, data);
				}
				// // return values of callback with proper userdata and value
				// return callBack(err, result); //check this line for correct callBack
			});
		//}
		}else {
				// if client passed invalid data server will return "NOT ACCEPTABLE" error code
				 return callback (406, data);
		}
	};

module.exports = {
	"post": POST
};


// /**
//  * This file is used for the Controllers
//  * login function
//  *
//  * Author: Ruvim Kuzmik
//  * Last Data Modified: 5/22/2018
//  *
//  */
//
// // get all available helpers
// var helpers = require('../helpers/helpers');
// // get model to make a insertion to the database
// var model = require('../model/model');
//
//
// var POST = function(data, callBack) {
//
// var token = "Not Authorized";
//
// data.token = token;
// 	// If the object parsed correctly
// 	if (typeof data === 'object') {
// 		// Get the phonenumber string and change to string
// 		data.phoneNumber = Number(data.phoneNumber);
//
// 		// Check if the infomation passed is formatted correctly
// 		var valid = helpers.profileChecker.checkToken(data); // true or false
//
// 		// is data user passed
// 		if (valid) {
// 			//Need to turn phoneNumber from integer to string
// 			data.phoneNumber = data.phoneNumber.toString();
//
// 			// pass the data to model
// 			model.login.post(data, function(err, result){
// 				if (err) {
// 					// if client passed invalid data server will return "INTERNAL SERVER ERROR" error code
// 					result.token = token;
// 					err = 500;
// 				} else {
//
// 					// generate token using phoneNumber and password
// 					result.token = helpers.token.generate(data);// 1. Call the token creator 2. Create a token using "data.phoneNumber" and "data.password"
//
// 					// set the status code to "CREATED"
// 					err = 200;
// 				}
// 				// return values of callback with proper userdata and value
// 				return callBack(err, result); //check this line for correct callBack
// 			});
//
// 		} else {
// 			// if client passed invalid data server will return "NOT ACCEPTABLE" error code
// 			err = 406;
// 			return callBack(err, data);
// 		}
// 	} else {
// 		// if client passed in valid data server will return "NOT ACCEPTABLE" error code
// 		err = 406;
// 		return callBack(err, data);
// 	}
// }
//
// module.exports = {
// 	"post": POST
// }
// test = {
// 	"phoneNumber" : 1111222222,
// 	"password" : "1234567"
// };
// tesla = {
// 	"phoneNumber": 2182147582,
// 	 "password": "a2123"
//  };
// // console.log(POST(test, callback));
// POST(tesla, function(err, data){
// 	console.log(err);
// 	console.log(data);
// });
// // console.log(post(transData));
// // // post(transData, function(err, data){
// // //   console.log(err);
// // //   console.log(data);
// // // });
// console.log("YTIxMjN8bXRhdnwyMTgyMTQ3NTgy");
