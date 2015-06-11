"use strict";

var oauth = include("oauth"),
	cache = require("./cache");

module.exports = function(app) {
	app.get("/auth/request-token", function(req, res, next) {
		oauth.getOAuthRequestToken(function(err, token, secret){
			console.log(token);
			console.log(secret);
			if (err)
				res.status(500).send(err);
			else {
				cache[token] = secret;
				res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + token);
			}
		});
	});
};