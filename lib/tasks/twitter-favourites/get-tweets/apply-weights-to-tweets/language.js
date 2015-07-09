"use strict";

module.exports = function(user, tweet) {
    var language = user.language || "en";
    if (tweet.lang !== language)
        tweet.weight -= 2;
    return tweet;
};
