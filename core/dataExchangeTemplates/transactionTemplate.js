/* -----------------------------------------------------------------------
 *  						USER Transaction TEMPLATE
 *
 *
 * 		Current template used by the model for transaction endpoint
 * 		 as data exchange template for UI, it will have all user related transaction data
 *
 * -Last time modified by Bakhrom Botirov on 05/12/18 @11:055pm
 * -Last time modified by Robert Hill on 05/31/2018   @ 2:40pm (Requested by JBOON on 05/29/2018)
 /*Title to Transaction from USER
	--Add userId key to template object
 -----------------------------------------------------------------------*/

/**
This is profile Template from the BB
*/
module.exports = { // export the json data as key value pairs and let Model to use it

		"userId" : 0,				// Integer/ customer's userId from userData table
		"firstName" : "",			// String/ customer's firstName from userData table 
		"lastName" : "",			// String/ customer's firstName from userData table
		"phoneNumber" : 0,				// Integer/ customer's phone from userData table
		"transactionId": 0, 		// Auto Incremented integer
		"transactionAmount": 0,     // Transaction amount is going to come from user/client decimal
		"cashBackAmount": 0,      	// Cashback amount come from user/client, decimal
		"transactionFee": 4,      	// Transaction fee defaulted to $4 dollars per transaction, decimal
		"total": 0,  				// Validate ? integer && validate.length == 10 : False
		"timeRequested": null,		// yyyy-mm-dd 00:00:00,
		"timeDelivered": null,		// POST method will be = NULL, PUT method will be = yyyy-mm-dd 00:00:00,
		"confirmationCode": "", 	// Created by the controller using timeRequested + user.phoneNumber, string
		"isCancelled": false
	}
