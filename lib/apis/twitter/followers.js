"use strict";

var twitter = include("twitter-oauth"),
    Promise = require("bluebird");

module.exports = function(token, secret) {
    return function() {
        return new Promise(function(resolve, reject) {
            twitter.followers("ids", { count: 100 }, token, secret, function(err, data) {
                if (err) reject(err);
                else resolve(data.ids);
            });
        });
    };
};
