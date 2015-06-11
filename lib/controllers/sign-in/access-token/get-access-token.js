"use strict";

var Promise = require("bluebird"),
	twitter = include("twitter-oauth");

module.exports = function(token, secret, verifier) {
	return new Promise(function(resolve, reject) {
		twitter.getAccessToken(token, secret, verifier, function(err, accessToken, accessTokenSecret) {
			if (err)
				reject(err);
			else
				resolve({ token: accessToken, secret: accessTokenSecret });
		});
	});
};