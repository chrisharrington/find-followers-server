"use strict";

require("./lib/globals");

var Pipeline = include("pipeline"),
    User = include("data/models").User,
	secretConfig = include("secret"),
    _ = require("lodash"),
	Twitter = require("node-twitter-api");

//include("data").initialize().then(function() {
//    var token = "7uiAhAAAAAAAgAb5AAABTeOu6vs",
//		secret = "XjJlAt0Mkau758vrnVcGZrXm7bFZTp7l",
//		verifier = "nynnLg6CrTQjDhKoWqqENpSZm4UlLAIi";
//	
//	new Pipeline([
//		include("controllers/sign-in/access-token/get-access-token"),
//		include("controllers/sign-in/access-token//verify-credentials"),
//		include("controllers/sign-in/access-token//save-user"),
//		include("controllers/sign-in/access-token//strip-credentials")
//	]).go(oauth, token, secret, verifier).then(function(user) {
//		console.log(user);
//	}).catch(function(err) {
//		console.error(err);
//	}).finally(function() {
//		process.exit();
//	});
//});

var twitter = new Twitter({
	consumerKey: secretConfig.twitter.consumerKey,
	consumerSecret: secretConfig.twitter.consumerSecret,
	callback: "http://findfollowers.me/#/oauth_callback"
});

var token = "c8q0FAAAAAAAgAb5AAABTeQnXH4",
	secret = "yLWlYAF78zVfBBzTdwUo4B33QEgcb63H",
	verifier = "FqCpU00kVkwtDanKUJ4FLlqgX8E0RvaN";

twitter.getAccessToken(token, secret, verifier, function(err, accessToken, accessTokenSecret) {
	if (err)
		console.error(err);
	else
		console.log(accessToken);
});