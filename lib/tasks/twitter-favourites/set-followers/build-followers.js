"use strict";

var _ = require("lodash"),

    Follower = include("data/models").Follower;

module.exports = function(storedFollowers, currentFollowers, favourites) {
    var followers = [];
    _.each(require("./diff")(storedFollowers, currentFollowers), function(follower) {
        var favourite = _.find(favourites, function(f) { return f.twitterId === follower; });
        if (favourite)
            followers.push(new Follower(favourite));
    });
    return followers;
}
