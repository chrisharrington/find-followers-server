"use strict";

require("./lib/globals");

var Pipeline = include("pipeline"),
	OAuth = require("oauth").OAuth,
	secretConfig = include("secret");

var token = "-cxgkgAAAAAAgAb5AAABTcTo17s",
	secret = "2HPigiA6fZRYY4RZ3B38H5R3TIgojI8x",
	verifier = "Yukvo2xTamVoz0iQKAwiCpVNIAMPUgpz";

var accessToken = "14772674-fs5wiCen4dFIFmvtnS8xwwDZSpJWQP2U7RkbrLsFN",
	accessSecret = "qKwfVxETf1KgyXiaAPHs1ARX3oXdi31fzUswD8j3fBGT1";

var oauth = new OAuth(
	"https://api.twitter.com/oauth/request_token", 
	"https://api.twitter.com/oauth/access_token", 
	secretConfig.twitter.consumerKey,
	secretConfig.twitter.consumerSecret,
	"1.0A",
	null,
	"HMAC-SHA1"
);

include("data").initialize().then(function() {
	new Pipeline([
	//	include("controllers/sign-in/access-token/get-access-token")
		include("controllers/sign-in/access-token/verify-credentials"),
		include("controllers/sign-in/access-token/save-user")
	]).go(oauth, accessToken, accessSecret).then(function(a, b, c) {
		console.log(a);
		if (b)
			console.log(b);
		if (c)
			console.log(c);
	}).catch(function(err) {
		console.error(err.stack);
	});
});