"use strict";

var Promise = require("bluebird"),
	oauth = include("oauth"),
    querystring = require("querystring"),
    moment = require("moment");

module.exports = function(token, secret) {
	return function(handle) {
        return new Promise(function(resolve, reject) {
			oauth.get("https://api.twitter.com/1.1/users/lookup.json?screen_name=" + handle, token, secret, function(err, data) {
                if (err)
                    reject(err);
                else
                    resolve(JSON.parse(data)[0]);
            });
        });
	};
};