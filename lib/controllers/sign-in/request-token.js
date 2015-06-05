"use strict";

var OAuth = require("oauth").OAuth,
	secret = include("secret"),
	cache = require("./cache");

var oauth = new OAuth(
	"https://api.twitter.com/oauth/request_token", 
	"https://api.twitter.com/oauth/access_token", 
	secret.twitter.consumerKey,
	secret.twitter.consumerSecret,
	"1.0A",
	null,
	"HMAC-SHA1"
);

module.exports = function(app) {
	app.get("/request-token", function(req, res, next) {
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