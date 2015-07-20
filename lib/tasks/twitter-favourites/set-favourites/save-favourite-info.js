"use strict";

var _ = require("lodash"),
    Promise = require("bluebird"),

    Favourite = include("data/models").Favourite,

    Logger = include("logger"),

    getTermFromTweet = require("../get-term-from-tweet");

module.exports = function(user, tweets) {
    var logger = new Logger(user._id);
    return logger.info("Saving favourited tweets.").then(function() {
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
        })).then(function() {
            logger.info("Saving favourited tweets done.");
        });
    });
};
