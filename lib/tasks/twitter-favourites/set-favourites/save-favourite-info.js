"use strict";

var _ = require("lodash"),
    Promise = require("bluebird"),

    Favourite = include("data/models").Favourite,

    getTermFromTweet = require("../get-term-from-tweet");

module.exports = function(user, tweets) {
    return Promise.all(_.map(tweets, function(tweet) {
        return new Promise(function(resolve, reject) {
            new Favourite({
                userId: user._id,
                twitterId: tweet.user.id_str,
                term: getTermFromTweet(user, tweet)
            }).save(function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }));
};
