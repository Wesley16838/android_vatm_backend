const db = require('./dbConnection');

//var sqlGet = `SELECT * FROM transaction AS tr INNER JOIN userData AS us ON tr.transactionId = us.transactionId && tr.userId = us.userId WHERE tr.timeDelivered=? && tr.transactionId = ?`;
			

// var queryString = `SELECT * 
// 					FROM transaction AS tr 
// 					INNER JOIN userTransaction AS ut ON tr.transactionId = ut.transactionId
// 					INNER JOIN userData 	   AS ud ON ut.userId = ud.userId
// 					WHERE tr.timeDelivered IS NULL ORDER BY tr.transactionId DESC LIMIT 1`;

// var queryString = "SELECT * FROM transaction WHERE transactionId = 77 ";

// var queryString = "UPDATE transaction SET timeDelivered=NULL WHERE transactionId=77";



db.query(queryString,function(err, data){
	console.log(data);
});