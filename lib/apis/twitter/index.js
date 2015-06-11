"use strict";

module.exports = function(token, secret) {
	this.search = require("./search")(token, secret);
};