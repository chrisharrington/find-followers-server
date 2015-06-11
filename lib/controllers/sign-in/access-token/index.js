"use strict";

var twitter = include("twitter-oauth"),
	secret = include("secret"),
	cache = require("../cache"),
	
	Pipeline = include("pipeline");

module.exports = function(app) {
	app.get("/auth/access-token", function(req, res, next) {
		var token = req.query.oauth_token,
			secret = cache[req.query.oauth_token],
			verifier = req.query.oauth_verifier;
		
		new Pipeline([
			require("./get-access-token"),
			require("./verify-credentials"),
			require("./save-user"),
            require("./strip-credentials")
		]).go(twitter, token, secret, verifier).then(function(user) {
			res.send(user);
		}).catch(function(err) {
			res.status(500).send(err);
		});
	});
};