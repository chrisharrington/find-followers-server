"use strict";

var Promise = require("bluebird");

module.exports = function(twitter, token, secret, verifier) {
	return new Promise(function(resolve, reject) {
		twitter.getAccessToken(token, secret, verifier, function(err, accessToken, accessTokenSecret) {
			if (err)
				reject(err);
			else
				resolve(oauth, accessToken, accessTokenSecret);
		});
	});
};