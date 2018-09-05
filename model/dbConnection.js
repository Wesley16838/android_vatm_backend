
/* =============================================================== *
 * Description: 
 * This file is automated connection to VATM database
 * it creates an VATM db object and and exports that object 
 * as a module.
 * --------------------------------------------------------------- * 
 * Created and modified by Bakhrom Botirov @ 05/15/2018	
 *
 * =============================================================== */ 

//
//
// All the necesary methods of mysql module is available 
// through initiilized object with db method 
// For example: 
// 
// **initialize the object by **
// 	  const vatm = new VatmDb();
// 
// ** call all the available mysql methods by using ** 
//    vatm.db.query(queryString, values, callback);
//
//



/*****************************************************************************
                              CREATING CONSTRUCTUR FUNCTION
*****************************************************************************/
/*
 * This function will be construct all the connection and other available
 * methods and properties 	
*/
// Get mysql module and initilise
var mysql = require('mysql');

// Get all the global settings for VATM api
var settings = require ('../settings');

const VatmDatabase = function(){
	// Create connection to database with given 
	// database configuration file
	this.db = mysql.createConnection(settings.dbConfig);
} 


 // * This function will be a connection method to establish connection 
 // * to vatm sql database

VatmDatabase.prototype.conn = function(){
	// Make connection to data base and make it available as 
	// a method to the class 
	this.db.connect(function(err){
		if(err) throw err;
		console.log("VATM DB CONNECTION ESTABLISHED SUCCESSFULLY");
	});
}

var vatmdb = new VatmDatabase();

vatmdb.conn();
// export instantiated object as an module
module.exports = vatmdb.db;
