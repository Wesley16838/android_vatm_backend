//require driver sql for query
var mysql = require('mysql');

//configuration setting to connect to the database 
var settings = require('../settings');

//creat connnection variable to database
var con = mysql.createConnection(settings.dbConfig);

con.connect(function(err) {
	if (err) {
		console.log("Failed to connect vatm database!");
	}else{
		console.log(" VATM database is connected!");		
	}
});

var createTables = function(){

	//create userData table in vatm database
	var sqlUser = "CREATE TABLE userData(userId INT (11) NOT NULL AUTO_INCREMENT, email VARCHAR (100) NOT NULL, lastName VARCHAR (50) NOT NULL, firstName VARCHAR(50) NOT NULL, password VARCHAR(30) NOT NULL, phoneNumber INT(10) NOT NULL, PRIMARY KEY (userId))";
	con.query(sqlUser, function (err, result){
		if (err){
				console.log("Failed to create userData table!");
			}else{	
				console.log("userData table is created");
			}
		});
		
	//create userAddress table in vatm database
	var sqlAddress = "CREATE TABLE userAddress(addressId INT(11) NOT NULL AUTO_INCREMENT, address VARCHAR (100) NOT NULL, myState VARCHAR (25) NOT NULL, city VARCHAR(25) NOT NULL, zip BIGINT(10) NOT NULL, PRIMARY KEY (addressId))";
	con.query(sqlAddress, function (err, result){
		if (err){
			console.log("Failed to create userAddress table!");
		}else{	
			console.log("userAddress table is created");
		}
	});
		
	//create userPhoto table in vatm database
	var sqlPhoto = "CREATE TABLE userPhoto(userId INT (11), photo LONGBLOB)";
	con.query(sqlPhoto, function (err, result){
		if (err){
			console.log("Failed to create userPhoto table!");
		}else{	
			console.log("userPhoto table is created");
		}
	});

	//create userPhoto table in vatm database
	var sqlPhoto = "CREATE TABLE user(userId INT (11), addressId INT (11))";
	con.query(sqlPhoto, function (err, result){
		if (err){
			console.log("Failed to create userPhoto table!");
		}else{	
			console.log("userPhoto table is created");
		}
	});
	
	//create Transaction table in  database
	var sqlTrans = "CREATE TABLE transaction(transactionId INT (11) NOT NULL AUTO_INCREMENT, transactionAmount DECIMAL(10,2) NOT NULL, cashBackAmount INT(3) NOT NULL, transactionFee DECIMAL DEFAULT 4.0, total DECIMAL (10,2) NOT NULL, timeRequest DATETIME NOT NULL, timeDelivery DATETIME NOT NULL, confirmationCode BLOB NOT NULL, isCancelled BOOLEAN, PRIMARY KEY (transactionId))";
	con.query(sqlTrans, function (err, result){
		if (err){
				console.log("DB-TS-Error: Failed to create transaction table!");
		}
		else{	
				console.log("Transaction table is created");
		}
	});
		
	//create translookup table between Transaction and UserData tables
	var sqlUserTransaction = "CREATE TABLE userTransaction(transactionId INT (11), userId INT (11))";
	
	con.query(sqlUserTransaction, function (err, result){
		if (err){
			console.log("DB-TS-Error: Failed to create userTransaction table!");
		}
		else{	
			console.log("userTransaction table is created");
		}
	});
}
createTables();