"use strict";

var Promise = require("bluebird"),
	twitter = include("twitter-oauth");

module.exports = function(params) {
	var token = params.token, secret = params.secret;
	return new Promise(function(resolve, reject) {
		twitter.verifyCredentials(token, secret, function(err, data) {
			if (err)
				reject(err);
			else {
				resolve({
					name: data.name,
					handle: data.screen_name,
					image: data.profile_image_url,
					token: token,
					secret: secret
				});
			}
		});
	});
};