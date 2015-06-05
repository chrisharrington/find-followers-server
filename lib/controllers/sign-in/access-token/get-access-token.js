"use strict";

var Promise = require("bluebird");

module.exports = function(oauth, token, secret, verifier) {
	return new Promise(function(resolve, reject) {
		oauth.getOAuthAccessToken(token, secret, verifier, function(err, accessToken, accessTokenSecret) {
			if (err)
				reject(err);
			else
				resolve(oauth, accessToken, accessTokenSecret);
		});
	});
};