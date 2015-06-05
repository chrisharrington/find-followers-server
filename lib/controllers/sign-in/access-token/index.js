"use strict";

var OAuth = require("oauth").OAuth,
	secret = include("secret"),
	cache = require("../cache"),
	
	Pipeline = include("pipeline");

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
	app.get("/access-token", function(req, res, next) {
		var token = req.query.oauth_token,
			secret = cache[req.query.oauth_token],
			verifier = req.query.oauth_verifier;
		
		new Pipeline([
			require("./get-access-token"),
			require("./verify-credentials"),
			require("./save-user")
		]).go(oauth, token, secret, verifier).then(function(user) {
			res.send(user);
		}).catch(function(err) {
			res.status(500).send(err);
		});
	});
};