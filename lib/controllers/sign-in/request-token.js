"use strict";

var twitter = include("twitter-oauth"),
	cache = require("./cache");

module.exports = function(app) {
	app.get("/auth/request-token", function(req, res, next) {
		twitter.getRequestToken(function(err, token, secret) {
			console.log("token: " + token);
			console.log("secret: " + secret);
			if (err)
				res.status(500).send(err);
			else {
				cache[token] = secret;
				res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + token);
			}
		});
	});
};