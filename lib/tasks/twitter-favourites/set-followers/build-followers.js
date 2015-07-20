"use strict";

var _ = require("lodash"),

    Follower = include("data/models").Follower,
    Logger = include("logger");

module.exports = function(user, storedFollowers, currentFollowers, favourites) {
    var followers = [],
        logger = new Logger(user._id);

    return require("./diff")(user, storedFollowers, currentFollowers).then(function(diff) {
        _.each(diff, function(follower) {
            var favourite = _.find(favourites, function(f) { return f.twitterId === follower; });
            if (favourite)
                followers.push(new Follower(favourite));
        });

        return logger.info("Followers attributed to app: " + followers.length).then(function() {
            return followers;
        });
    });
}
