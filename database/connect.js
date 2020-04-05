const mongoose = require('mongoose');
const DataBaseCredentials = require('./credentials');

/**
 * @readonly
 * @enum {string}
 * @typedef {('read'|'write')[]} dbPermissions
 */

/**
 * This class has been put into gitIgnore to prevent credentials misuse
 * If not found, create this class in the file ./credentials.js
 * @typedef {Object} DataBaseCredentials
 * @property {string} db - name of the database
 * @property {string} username - user who can access the database
 * @property {string} password - password for the db user
 * @property {dbPermission} permissions - All the permissions assigned to the user
 * @property {function():string} generateUrl
 */

 /**
 * This callback is called after the connection is successfull.
 * @callback dbConnectionSuccessCallBack
 * @param {MongoClient} client - client connection info @see http://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html
 */

/**
 * @async
 * creates a connection to the cloud based mongodb server
 * The credentials for the database are in {@link DataBaseCredentials}
 * @param {dbConnectionSuccessCallBack} successCallback - called after connection is successful
 */
module.exports = function connectMongodb(successCallback) {
    return mongoose.connect(DataBaseCredentials.generateUrl.call(DataBaseCredentials))
        .then(client => {
            successCallback(client);
        })
        .catch(err => console.error(err));
}
