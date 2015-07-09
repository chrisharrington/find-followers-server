"use strict";

var _ = require("lodash"),
    Pipeline = include("pipeline");

module.exports = function(user, tweets) {
    return Promise.all(_.map(tweets, function(tweet) {
        return new Pipeline([
            require("./apply-default-weight"),
            require("./has-url"),
            require("./follower-count"),
            require("./follower-following-ratio"),
            require("./retweet"),
            require("./too-many-hashtags"),
            require("./following-count"),
            require("./job"),
            require("./reply"),
            require("./language").bind(this, user)
        ]).go(tweet);
    }));
};
