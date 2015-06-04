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
	app.get("/access-token", function(req, res, next) {
		//oauth_token, oauth_token_secret, oauth_verifier,  callbac
		var oauthToken = req.query.oauthToken;
		oauth.getOAuthAccessToken(oauthToken, cache[oauthToken], req.query.oauthVerifier, function(err, accessToken, accessTokenSecret) {
			if (err)
				res.status(500).send(err);
			else {
				cache.set(accessToken, accessTokenSecret);
				res.sendStatus(200);
			}
		});
	});
};