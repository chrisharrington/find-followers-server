"use strict";

var _ = require("lodash"),

    Follower = include("data/models").Follower;

module.exports = function(existingFollowers, currentFollowers, favourites) {
    var followers = [];
    _.each(require("./diff")(existingFollowers, currentFollowers), function(follower) {
        var favourite = _.find(favourites, function(f) { return f.twitterId === follower; });
        if (favourite)
            followers.push(new Follower(favourite));
    });
    debugger;
    return followers;
}
