"use strict";

module.exports = function(accessToken, accessTokenSecret) {
	this.search = require("./search")(accessToken, accessTokenSecret);
};