"use strict";

var Promise = require("bluebird"),
	Twitter = include("apis/twitter");

module.exports = function(user, token, secret) {
	var twitter = new Twitter(token, secret);
	
	return new Promise(function(resolve, reject) {
		resolve(["blah", "boo", "abc"]);
	});
};

function _getTweets(token, term) {
	
};