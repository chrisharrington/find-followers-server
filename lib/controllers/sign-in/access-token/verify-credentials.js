"use strict";

var Promise = require("bluebird"),
	secret = include("secret");

module.exports = function(oauth, token, secret) {
	return new Promise(function(resolve, reject) {
		oauth.get("https://api.twitter.com/1.1/account/verify_credentials.json", token, secret, function(err, data, response) {
			if (err)
				reject(err);
			else {
				var parsed = JSON.parse(data);
				resolve({
					name: parsed.name,
					handle: parsed.screen_name,
					image: parsed.profile_image_url,
					token: token,
					secret: secret
				});
			}
		});
	});
};