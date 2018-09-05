/******************************************************************************
 *
 * This file will be used as a main controller
 * for keep all the available controllers
 *
 *****************************************************************************/

// require User signUp controller
const signUp = require('./signUp');
// require User profile controller
const profiles = require('./profile');
// //require User Login controller
const login = require('./login');
// require User Transcation controller
const trans = require('./transaction');

/*******************************************************************************

                          EXPORT reference OBJECT


*******************************************************************************/
// exporting available controllers to the server
module.exports = {
 //reference to the signUp controller file object
 'signUp': signUp,
 // reference to the profile controller file object
 'profile': profiles,
 // // reference to the login controller file object
  'login': login,
 // reference to the transaction controller file object
 'transaction': trans
}
