// Importing signup module to get ready for controller 
const signUp = require('./signUp');
//RH3 added the below variable 05/04/2018
const profile = require('./profile'); //This is Select userData
//RH3 added the below variable 05/06/2018
//const update = require('./dbUpdateData'); //This is Update user

//Get the login endpoint
const login = require('./login');
// Importing transaction module and its methods 
// Added by Bakhrom Botirov @ 05/14/2018
const transaction = require('./transaction');

module.exports = {
	"signUp": signUp,
	//Reference to model userData
	"userProfile" : profile, //RH3 Added this reference 05/04/2018
	//Reference to model Update statement
	//"userUpdate"  : update //RH3 Added this reference 05/06/2018
	
	// The key "transaction" is reference to transaction model module 
	// it will have 3 methods such as get, post, put 
	// last updated by Bakhrom Botirov @ 05/14/2018
	"transaction": transaction,
	// The key "login" is reference to transaction model module 
	// it will have 3 methods such as get, post, put 
	// last updated by Bakhrom Botirov @ 05/14/2018
	"login": login
}
