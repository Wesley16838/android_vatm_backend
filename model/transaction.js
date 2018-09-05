/******************************************************************************
-------------------------------------------------------------------------------
 * This File has the methode for the
 * verified user data in the db.
 * To attempt INSERT, SELECT, and UPDATE statments on the DB for transactions

Title: Model Transaction
Author: Bakhrom Botirov & Tuyet Luu
Date: 05-13-2018
Code version: 1.0.0;
Location: ../model
-------------------------------------------------------------------------------

******************************************************************************/

// Require VATM Database module
const db = require('./dbConnection');

// Create vatm db module
// const vatm = new dbConfig();

// getting premade data exchange template from core of app and assign it into variable
var uiTemplate = require('../core/dataExchangeTemplates/transactionTemplate');

/*---------------------------------------------------------------------------------------------*/

// This dummy data temprorary data once this profile model is fully implemented it will be removed
// var transData = {
// 	"phoneNumber": 2345678955,
// 	"password": "Password2123!",
// 	"transactionId": 7,
// 	"transactionAmount": 32,
// 	"cashBackAmount": 20,
// 	"transactionFee": 4,
// 	"total": 56,
// 	"timeRequested": "2018-05-13 12:00:00",
// 	"timeDelivered": "2018-05-18 12:00:00",
// 	"confirmationCode": "adsfjkhalsdjkofladhjsflaksqdhveipqwy",
// 	"isCancelled": false
// };

/*---------------------------------------------------------------------------------------------*/



/*****************************************************************************
                              CREATE / POST
*****************************************************************************/


var POST = function(data, callback){
	// get user phone number and password for user checking purposes
	var phoneNumber = data.phoneNumber;
	var password = data.password;

	// prepare transaction data to be entered
	var transactionValues = {
		"transactionAmount": db.escape(data.transactionAmount),
		"cashBackAmount": db.escape(data.cashBackAmount),
		"transactionFee": db.escape(data.transactionFee),
		"total": db.escape(data.total),
		"timeRequested": data.timeRequested,
		"isCancelled": data.isCancelled,
		"confirmationCode": data.confirmationCode
	};

	// select password and phone from userData table
	var getUserData = "SELECT * FROM userData WHERE password=? AND phoneNumber=?";

	// post transaction into transaction table
	var postData = "INSERT INTO `transaction` SET ?";

	// updata user transaction lookup table with the new inserted transaction
	var postLookup = "INSERT INTO userTransaction (`transactionId`, `userId`) VALUES (?, ?)";

	//
	//
	db.query(getUserData, [password, phoneNumber], function(err, userData){
		// check if user exists in database
		if(err || userData.length === 0){
			return callback(500, null);
		}

		// get user id
		var userId = userData[0].userId;

		// post user transaction to the transaction table
		db.query(postData, transactionValues, function(err, result){

			// if error occuers with transaction, reject the connection
			// and return 500 error to the user`
			if(err || result.length === 0){
				console.log('Following error: ' + err);
				return callback(500,null);
			}

			var insertedTransId = result.insertId;

			//
			// updating transaction lookup table to have user reference and transaction id
			//
			db.query(postLookup, [insertedTransId, userId]);

			// return transaction id and 200 ok to the user
			return callback(200, {"transactionId":insertedTransId});

		});
	});
}



/*****************************************************************************
                              SELECT / GET
*****************************************************************************/
/**
 * This is the function for the Controller
 * Controller will passing password, phoneNumber, and transactionId to Model
 * Model will get transaction data. Using a SELECT statement for the transaction
 * data for user when passing password, phone Number
 */

// Get transaction data with userId and transaction user when passing user's password and phone
var GET = function(data, callback){

	//initialization values
	var password = data.password;
	var phoneNumber = data.phoneNumber;
	var getTransactionId = data.transactionId;
    var getUserId = 0;
	// get userId from password and phone from userData table
	var sql = "SELECT * FROM userData WHERE password=? AND phoneNumber=?";
	db.query(sql, [password, phoneNumber] , function (err, userData){
		if (err || userData.length === 0){

			//console.log("DB-Post-Error : The password and phone don't exist in the database!" + err);
			return callback( 500, "DB-Post-Error : The password and phone don't exist in the database!");
		}
		else{
			//getUserId from the query userData
			getUserId = userData[0].userId;

			//set the transaction into the transaction template in dataExchangeTemplates
			uiTemplate.userId = userData[0].userId;
			uiTemplate.firstName = userData[0].firstName;
			uiTemplate.lastName = userData[0].lastName;
			uiTemplate.phoneNumber = userData[0].phoneNumber;
			//retrieve transaction data
			//var getSqlTransactions = "SELECT * FROM transaction WHERE transactionId=? ";

			//retrieve Transaction table
			var sqlGet = "SELECT * FROM transaction AS tr INNER JOIN userTransaction AS us ON tr.transactionId = us.transactionId WHERE us.userId=? && us.transactionId=?";
			db.query(sqlGet, [getUserId, getTransactionId] , function (err, transactionData){
				if (err || transactionData.length == 0){

					//console.log("DB-Post-Error : The password and phone don't exist in the database!" + err);
					return callback(500, null);
				}
				else{
					//set the transaction into the transaction template in dataExchangeTemplates
					uiTemplate.transactionId = transactionData[0].transactionId;
					uiTemplate.transactionAmount = transactionData[0].transactionAmount;
					uiTemplate.cashBackAmount = transactionData[0].cashBackAmount;
					uiTemplate.transactionFee = transactionData[0].transactionFee;
					uiTemplate.total = transactionData[0].total;
					uiTemplate.timeRequested = transactionData[0].timeRequested;
					uiTemplate.timeDelivered = transactionData[0].timeDelivered;
					uiTemplate.confirmationCode = transactionData[0].confirmationCode;
					uiTemplate.isCancelled = transactionData[0].isCancelled;


					//return the transaction template.
					return callback(err, uiTemplate);
				}
			});
		}
	});
}

/*****************************************************************************
                              UPDATE / PUT
*****************************************************************************/

var PUT = function(dataPut, callback){

	//initialization values
	var password = dataPut.password;
	var phoneNumber = dataPut.phoneNumber;
	var transactionId = dataPut.transactionId;
	var timeDelivered = dataPut.timeDelivered;
	var timeRequested = dataPut.timeRequested;
	var confirmationCode = dataPut.confirmationCode;
    var isCancelled = dataPut.isCancelled;
	var getUserId = 0;

	var sql = "SELECT * FROM userData WHERE password=? AND phoneNumber=?";
	db.query(sql, [password, phoneNumber], function (err, userData){

		if (err || userData.length === 0){
		
			//console.log("DB-Post-Error : The password and phone don't exist in the database!" + err);
			return callback( 500, "DB-Post-Error : The password and phone don't exist in the database!");
		}
		else{

			//getUserId from the query userData
			getUserId = userData[0].userId;

			//Update transaction data
			// Current code was commented by Bakhrom Botirov per Jonathan's change on vendor quantity as of 06/04/18
			//var sqlPut = "UPDATE transaction AS tr JOIN userTransaction AS us ON tr.transactionId = us.transactionId SET timeDelivered=?,confirmationCode=?, isCancelled=? WHERE tr.transactionId =?&&us.userId =?";
			
			//Update transaction data
			var sqlPut = "UPDATE transaction SET timeDelivered=?, isCancelled=? WHERE transactionId =?";
			
			
			db.query(sqlPut, [timeDelivered, isCancelled, transactionId], function (err, transaction){
				if (err || transaction.length === 0 || transaction.affectedRows === 0){

					return callback( 500, "There is error with the user transaction.");
				}
				else{

					//retrieve Transaction table
					return callback("no errors", {"transactionId":transactionId});
				}
			});
		}
	});
}

/*****************************************************************************
                              SELECT / GET LAST TRANSACTION
*****************************************************************************/
/**
 * This is the function for the Controller
 * Controller will passing password, phoneNumber, and transactionId to Model
 * Model will get last transaction data. Using a SELECT statement for the transaction
 * data for user when passing password, phone Number
 ***************************************************************************/

var GOT = function(data, callback){
	
	
	//initialization values
	var password = data.password;
	var phoneNumber = data.phoneNumber;
	var getTransactionId = data.transactionId;
    var isVendor = 0;
	// get userId from password and phone from userData table
	var sql = "SELECT * FROM userData WHERE password=? AND phoneNumber=?";
	db.query(sql, [password, phoneNumber] , function (err, userData){
		if (err || userData.length === 0){

			//console.log("DB-Post-Error : The password and phone don't exist in the database!" + err);
			return callback( 500, "DB-Post-Error : The password and phone don't exist in the database!");
		}
		else{
			//getUserId from the query userData
			isVendor = userData[0].isVendor;
			var userId = userData[0].userId;
			
			if(isVendor == 1 || isVendor == true){
				
				//retrieve Transaction table
				var sqlGet = `SELECT * 
						FROM transaction AS tr 
						INNER JOIN userTransaction AS ut ON tr.transactionId = ut.transactionId
						INNER JOIN userData 	   AS ud ON ut.userId = ud.userId
						WHERE tr.timeDelivered IS NULL ORDER BY tr.transactionId DESC LIMIT 1`;
			}else{
				
				//retrieve Transaction table
				var sqlGet = `SELECT * 
						FROM transaction AS tr 
						INNER JOIN userTransaction AS ut ON tr.transactionId = ut.transactionId
						INNER JOIN userData 	   AS ud ON ut.userId = ud.userId
						WHERE tr.timeDelivered IS NULL AND ud.userId = ? ORDER BY tr.transactionId DESC LIMIT 1`;	
			}
			db.query(sqlGet, [userId], function (err, customerData){

				if (err || customerData.length == 0){
					console.log(err);
					return callback(500, null);
				}else{
					//set the transaction into the transaction template in dataExchangeTemplates
					uiTemplate.userId = customerData[0].userId;
					uiTemplate.firstName = customerData[0].firstName;
					uiTemplate.lastName = customerData[0].lastName;
					uiTemplate.phoneNumber = customerData[0].phoneNumber;
					uiTemplate.transactionId = customerData[0].transactionId;
					uiTemplate.transactionAmount = customerData[0].transactionAmount;
					uiTemplate.cashBackAmount = customerData[0].cashBackAmount;
					uiTemplate.transactionFee = customerData[0].transactionFee;
					uiTemplate.total = customerData[0].total;
					uiTemplate.timeRequested = customerData[0].timeRequested;
					uiTemplate.timeDelivered = customerData[0].timeDelivered;
					uiTemplate.confirmationCode = customerData[0].confirmationCode;
					uiTemplate.isCancelled = customerData[0].isCancelled;

					//return the transaction template.
					return callback(err, uiTemplate);
				}
			});
		}		
		
	});
		//}
	};



module.exports = {
	"post": POST,
	"get": GET,
	"put": PUT,
	"got" : GOT
}
