/**
 * This file is used for the Model
 * login function
 *
 * Author: Ruvim Kuzmik
 * Last Data Modified: 5/22/2018
 *
 */

// Require VATM Database module 
const db = require('./dbConnection');

var POST = function(data, callBack){
	//initialization values 
	var values = [data.phoneNumber, data.password];

	var queryString = 'SELECT phoneNumber, password FROM userData WHERE phoneNumber = ? AND password = ?';
	db.query(queryString, values, function (err, result){
			if (err || result.length === 0) {
				console.log("database error message: " + err);
				return callBack(true, null);
			} else {
				// if there is no error, you have the result and get last insertion id send it to the client 
				return callBack(false, result[0]);
			}
	});
};

module.exports = {
	"post": POST
}
