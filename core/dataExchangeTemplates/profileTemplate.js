/* -----------------------------------------------------------------------
 *  						USER PROFILE TEMPLATE 
 * 
 *
 * 		Current template used by the model for profile endpoint template 
 * 			for UI, it will have all user related data 
 *
 * -Last time modified by Bakhrom Botirov on 05/08/18 @11:00pm
 * -----------------------------------------------------------------------*/

/**
This is profile Template from the BB
*/
module.exports = { // export the json data as key value pairs and let Model to use it
		
		"email":"",         //Validate ? regex : False
		"firstName":"",     //Validate ? string : False
		"lastName":"",      //Validate ? string : False
		"password":"",      //validate ? string : False
		"phoneNumber":0,  	//validate ? integer && validate.length == 10 : False
		"addresses":[ // if address table is null it will return an empty array.
							// {
							// "address":"User Address Info",
							// "city": "User Address Info",
							// "state":"User Address Info",
							// "country": "User Address Info",
							// "isPrimary":false
							// },
							// {
							// "address":"User Address Info",
							// "city": "User Address Info",
							// "state":"User Address Info",
							// "country": "User Address Info",
							// "isPrimary":true
							// }
		],
		"photo": null,	// If the userPhoto table is empty it will return null data back to the user.
		"isVendor": false // if the user is not a vendon by default this key will return false

	}