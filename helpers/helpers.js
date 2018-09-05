/******************************************************************************
Title: Helper Index Reference
Author: Robert Hill  = RH3;
Date: 05/06/2018
Code version: 1.0.0;
Location: ../helpers
-------------------------------------------------------------------------------
 * This file will be used as a index for helper files
 * to keep all the available helper function files
 --RH3
******************************************************************************/
/*******************************************************************************

                          KEY reference VALUES

*******************************************************************************/
//This is reference for the file that Creates and Reads Tokens
const token = require('./token');
//This is reference to the file that Checks values of objects
const proCheck = require('./profileChecker');
//THis is reference to the file that checks values for the Transaction
const transChecker = require('./transChecker');
//This is reference to the file that Creates and Reads
//Confirmation Codes --Last Modified RH3-->Update 05/13/2018
const conCode = require('./confirmationCode');
/*******************************************************************************

                          EXPORTED reference OBJECT

*******************************************************************************/
module.exports = {
	"token": token,
	"profileChecker": proCheck,
	"trans": transChecker,
	"codeCon": conCode
};
