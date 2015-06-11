var secret = include("secret"),
    OAuth = require("oauth").OAuth;

module.exports = new OAuth(
	"https://api.twitter.com/oauth/request_token", 
	"https://api.twitter.com/oauth/access_token", 
	secret.twitter.consumerKey,
	secret.twitter.consumerSecret,
	"1.0A",
	null,
	"HMAC-SHA1"
);