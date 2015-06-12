"use strict";

module.exports = function(token, secret) {
	this.search = require("./search")(token, secret);
	this.userInfo = require("./user-info")(token, secret);
};