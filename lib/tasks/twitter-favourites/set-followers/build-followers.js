"use strict";

var _ = require("lodash"),

    Follower = include("models/data").Follower;

module.exports = function(existingFollowers, currentFollowers, favourites) {
    var followers = [];
    _.each(require("./diff")(existingFollowers, currentFollowers), function(follower) {
        var favourite = _.find(favourites, function(f) { return f.twitterId === follower; });
        if (favourite)
            followers.push(new Follower(favourite));
    });
    return followers;
}
