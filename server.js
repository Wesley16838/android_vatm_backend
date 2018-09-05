// require http module
const http = require('http');

// require vatm api settings module 
const settings = require('./settings');

// require controller object
const controller = require('./controller/controller');

// get port number from settings and assign it to constant
const port = settings.webPort;

// create a http server 
const server = http.createServer();

//Connect to the database 
const db = require('./model/dbConnection');

// assign a port number to the server
server.listen(port);

// inform user with server port number
console.log('Listening to port ' + port + '...');

/*
 * This line of code is going to handle incoming requests
 * and send responses accordingly	
 * NOTE: this part will be more automated as we build and moved into separate folder
*/
server.on('request',function(req, res){
// checking if the content-type is the right type 
if(req.headers['content-type'] === 'application/json'){

	// checking for endpoints and methods
	switch(req.url) {
	/*-----------------------------------------*
	 *	"/login" endpoint - POST httpMethod   *
	 *-----------------------------------------*/
    	case '/login':

    		if(req.method === 'POST'){	
	    		// initilize variable for request body
				var requestBodyData = "";
				// start recieving chunks of data and add them into 
				req.on('data', function(chunk){
					//add chunks of the passed data in to the requestBodyData variable
					requestBodyData += chunk.toString();
				});
				// once finished recieving all the requested data from client set the response data into a json object 
				req.on('end', function() {

					// parse in comming json string into object
					var parsedData = JSON.parse(requestBodyData);	
					// The data that have been gotten from request pass it to the controller for further process 
					controller.login.post(parsedData, function(error, data){ 
						//write error and send it to client
						res.writeHead(error, // write head
							{
								"content-type": "application/json", 
								"authorization": data.token
							}
						);
						res.end();// end response
						return;
					});
					return;	
				});	
    		}else{

				// Write headers send error "FORBIDDEN"
				res.writeHead(400, {"content-type": "application/json"});
				// end response 
				res.end();	
    		}

        break;
	/*-----------------------------------------*
	 *	"/signup" endpoint - POST httpMethod   *
	 *-----------------------------------------*/
    	case '/signup':

    		if(req.method === 'POST'){	
	    		// initilize variable for request body
				var requestBodyData = "";
				// start recieving chunks of data and add them into 
				req.on('data', function(chunk){
					//add chunks of the passed data in to the requestBodyData variable
					requestBodyData += chunk.toString();
				});
				// once finished recieving all the requested data from client set the response data into a json object 
				req.on('end', function() {

					// parse in comming json string into object
					var parsedData = JSON.parse(requestBodyData);	
					// The data that have been gotten from request pass it to the controller for further process 
					controller.signUp.post(parsedData, function(error, data){ 
						//write error and send it to client
						res.writeHead(error, // write head
							{
								"content-type": "application/json", 
								"authorization": data.token
							}
						);
						res.end();// end response
						return;
					});
					return;	
				});	
    		}else{

				// Write headers send error "FORBIDDEN"
				res.writeHead(400, {"content-type": "application/json"});
				// end response 
				res.end();	
    		}

        break;

	/*-----------------------------------------*
	 *	"/profile" endpoint - GET httpMethod   *
	 *-----------------------------------------*/
    	case '/profile':
    		if(req.method === 'GET'){
	    		// initilize variable for request body
				var token = req.headers.authorization; // Get token
				if(typeof token !== 'string'){
					res.writeHead(406, {"content-type":"application/json", "authorization":"Not Authorized"});
					res.end();
					return;
				}
				// The data that have been gotten from request pass it to the controller for further process 
				controller.profile.get(token, function(error, data){ 

					res.writeHead(error, // write head
						{
							"content-type": "application/json", 
							"authorization": token
						}
					);

					res.write(JSON.stringify(data));
					res.end();// end response
					return;
				});
			}else if(req.method === 'PUT'){
				// initilize variable for request body
				var token = req.headers.authorization; // Get token
				// The data that have been gotten from request pass it to the controller for further process 
				controller.profile.get(token, function(error, data){ 

					res.writeHead(error, // write head
						{
							"content-type": "application/json", 
							"authorization": token
						}
					);

					res.write(JSON.stringify(data));
					res.end();// end response
					return;
				});

			}else{

				// Write headers send error "FORBIDDEN"
				res.writeHead(400, {"content-type": "application/json"});
				// end response 
				res.end();	
    		}
        break;



	/*----------------------------------------------*
	 *	"/transaction" endpoint - POST httpMethod   *
	 *----------------------------------------------*/
    	case '/transaction':
    	
	    	if(req.method === 'GET'){
	 			
	 			var dataToPass = {};
	    		// initilize variable for request body
				var token = req.headers.authorization; // Get token
				if(typeof token !== 'string'){
					res.writeHead(406, {"content-type":"application/json", "authorization":"Not Authorized"});
					res.end();
					return;
				}
				dataToPass.isVendor = req.headers.isvendor;
				dataToPass.transactionId = req.headers.transactionid;// look for transaction id do NOT process without ID
				dataToPass.token = token;
				// The data that have been gotten from request pass it to the controller for further process 
				controller.transaction.get(dataToPass, function(error, data){ 
					// Check if the data is coming from database is empty, if so let client know
					if(data == null){
						data = { "transactionId": "there is no transaction for any client"};
					}
					res.writeHead(error, // write head
						{
							"content-type": "application/json", 
							"authorization": token,
							"transactionId": data.transactionId
						}
					);
					res.write(JSON.stringify(data));
					res.end();// end response
					return;
				});

	    	}else if(req.method === 'POST'){
	    	
	    		// initilize variable for request body
				var token = req.headers.authorization; // Get token
				if(typeof token !== 'string'){
					res.writeHead(406, {"content-type":"application/json", "authorization":"Not Authorized"});
					res.end();
					return;
				}
				// initilize variable for request body
				var requestBodyData = "";
				// start recieving chunks of data and add them into 
				req.on('data', function(chunk){
					//add chunks of the passed data in to the requestBodyData variable
					requestBodyData += chunk.toString();
				});
				// once finished recieving all the requested data from client set the response data into a json object 
				req.on('end', function() {
					// parse the request body 
					var parsedData = JSON.parse(requestBodyData);
					// insert token into parsed object
					parsedData.token = token;
					// The data that have been gotten from request pass it to the controller for further process 
					controller.transaction.post(parsedData, function(error, data){ 
						//write error and send it to client
						res.writeHead(error, // write head
							{
								"content-type": "application/json", 
								"authorization": token
							}
						);
						res.write(JSON.stringify(data));
						res.end();// end response
						return;
					});
					return;	
				});	
	    	
	    	}else if(req.method === 'PUT'){
	    		// initilize variable for request body
				var token = req.headers.authorization; // Get token
				// check if the token that coming from client is the string 
				if(typeof token !== 'string'){
					res.writeHead(406, {"content-type":"application/json", "authorization":"Not Authorized"});
					res.end();
					return;
				}
				// initilize variable for request body
				var requestBodyData = "";
				// start recieving chunks of data and add them into 
				req.on('data', function(chunk){
					//add chunks of the passed data in to the requestBodyData variable
					requestBodyData += chunk.toString();
				});
				// once finished recieving all the requested data from client set the response data into a json object 
				req.on('end', function() {
					// parse the request body 
					var parsedData = JSON.parse(requestBodyData);
					// insert token into parsed object
					parsedData.token = token;
					// insert token into parsed object
					// The data that have been gotten from request pass it to the controller for further process 
					controller.transaction.put(parsedData, function(error, data){ 
						//write error and send it to client
						res.writeHead(error, // write head
							{
								"content-type": "application/json", 
								"authorization": token,
								"transactionId": parsedData.transactionId
							}
						);
						res.write(JSON.stringify(data));
						res.end();// end response
						return;
					});
					return;	
				});	

	    	}else{

				// Write headers send error "FORBIDDEN"
				res.writeHead(400, {"content-type": "application/json"});
				// end response 
				res.end();	
			}	
    		

        break;

	/*----------------------------------------------*
	 *	If any of the keywords are does not match   *
	 *----------------------------------------------*/
	default:
		// Write headers, send an error "BAD REQUEST"
		res.writeHead(400, {"content-type": "application/json"});
		// end response 
		res.end();	
	}

// invalid content type passed
}else{
	// Write headers send error "FORBIDDEN"
	res.writeHead(403, {"content-type": "application/json"});
	// end response 
	res.end();	
}
});














