var Twitter = require("node-twitter-api"),
	secret = include("secret");

module.exports = new Twitter({
	consumerKey: secret.twitter.consumerKey,
	consumerSecret: secret.twitter.consumerSecret,
	callback: "http://findfollowers.me/#/oauth_callback"
});