"use strict";

var Promise = require("bluebird"),
    twitter = include("twitter-oauth");

module.exports = function(user) {
    return new Promise(function(resolve, reject) {
        twitter.followers("ids", { screen_name: user.handle, count: 100 }, user.token, user.secret, function(err, followers) {
            if (err) reject(err);
            else resolve(followers.ids);
        });
    });
};
