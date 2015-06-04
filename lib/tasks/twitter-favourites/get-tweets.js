"use strict";

var Promise = require("bluebird");

module.exports = function(user) {
	return new Promise(function(resolve, reject) {
		resolve(["blah", "boo", "abc"]);
	});
};

function _getTweets(token, term) {
	
};