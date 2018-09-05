/******************************************************************************
-------------------------------------------------------------------------------
 * This File has the functions for the
 * verified user data in the db.
 * To attempt SELECT, and UPDATE statments on the DB

Title: Model profile
Author: Tuyet Luu
Date: 05072018
Code version: 1.0.0;
Location: ../model
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------
-- Last Modified and Tested: Bakhrom Botirov
-- Date: 05/09/2018
-- Code version: 1.1.0
******************************************************************************/

// Require VATM Database module 
const db = require('./dbConnection');

// // Create vatm db module
// const vatm = new dbConfig();

// getting premade data exchange template from core of app and assign it into variable
var uiTemplate = require('../core/dataExchangeTemplates/profileTemplate');


/*****************************************************************************
                              SELECT / GET
*****************************************************************************/
/**
 * This is the function for the Controller
 * to try a SELECT statement for the
 * from the  DB
 * and put it into an uiTemplate, pass it to model
 */
var GET = function(data, callback){
	//initialization values 
	var password = data.password;
	var phoneNumber = data.phoneNumber;

	// select password and phone from userData table	
	var getUserData = "SELECT * FROM userData WHERE password=? AND phoneNumber=?";
	// Join two tables  and get addresses regarding to user
	var retrieveAddresses = "SELECT * from userAddress AS address INNER JOIN user AS lookup ON address.addressId=lookup.addressId WHERE lookup.userId = ?";

	// run user data table for checking if the user exist or not and return all user data
	db.query(getUserData,[password, phoneNumber],function (err, userData){

		// if user data is empty stop the script and return error 
		if (err || userData.length === 0) {
			return callback(500, null);
		}
			// get the userId 
			var userId = userData[0].userId;

			/* set the user data into the template */ 
			uiTemplate.email = userData[0].email;
			uiTemplate.password = userData[0].password;
			uiTemplate.firstName = userData[0].firstName;
			uiTemplate.lastName = userData[0].lastName;
			uiTemplate.phoneNumber = userData[0].phoneNumber;
			uiTemplate.isVendor = userData[0].isVendor;

			// get user available addresses from db and insert into the template
			db.query(retrieveAddresses, [userId], function(err, addresses){
				// initilize as one address
				var address = null;
				
				// if addresses table is not null
				if(addresses.length !== 0){
					// loop through addreses and put them into an address template 
					for(i=0; i<addresses.length; i++){
						// initialize each address in to premade template with specific keys
						address = {
							"addressId":  addresses[i].addressId,
							"address": addresses[i].address,
							"city":  addresses[i].city,
							"state": addresses[i].myState,
							"isPrimary": addresses[i].isPrimary
						};

						// push into template to praparetion 
						uiTemplate.addresses.push(address);
					}	
				}
				// return callback function with the tamplate and success code to controller 
				return callback(200, uiTemplate);	
			});

	});
};



// export current module as profile object with two methods
module.exports = {
	"get": GET
};
