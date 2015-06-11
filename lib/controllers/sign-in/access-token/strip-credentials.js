"use strict";

var Promise = require("bluebird"),
	secret = include("secret");

module.exports = function(user) {
	user = user.toObject();
	delete user.token;
    delete user.secret;
    return user;
};