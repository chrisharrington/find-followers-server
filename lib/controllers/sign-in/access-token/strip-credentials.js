"use strict";

var Promise = require("bluebird"),
	secret = include("secret");

module.exports = function(user) {
	delete user.token;
    delete user.secret;
    return user;
};