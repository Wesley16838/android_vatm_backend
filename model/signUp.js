/* ========================================================================= *
 * Description: 
 * ------------------
 * Current file contains controller signup 
 * it will recieve validated json object file from  
 * controller signup.js and insert user data into database. 
 * As soon as the user data inserted into database successully,
 * it will callback controller with userId that is created recently
 * 
 * ---------------------------------------------------------------------------
 * File created and modified by developers: 
 * Bakhrom Botirov and Tuyet Luu @ 04/29/2018
 *  ======================================================================== */ 

// Require VATM Database module 
const db = require('./dbConnection');

// Create vatm db module
// const vatm = new dbConfig();

var POST = function(data, callBack){
	//initialization values 
	var values = [data.email, data.password, data.firstName, data.lastName, data.phoneNumber];

	//insert data to table vatm
	//var sql = "INSERT INTO `userData` (`email`, `password`, `firstName`, `lastName`, `phoneNumber`) VALUES ?";
	var queryString = "INSERT INTO `userData` SET ?"

	db.query(queryString, data, function (err, result){
			if (err) {
				return callBack(true, null);
			}else{
				// if there is no error, you have the result and get last insertion id send it to the client 
				return callBack(false, result.insertId);
			}
	});
};


module.exports = {
	"post": POST
};