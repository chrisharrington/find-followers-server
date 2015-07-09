"use strict";

var Twitter = include("apis/twitter"),
    _ = require("lodash");

module.exports = function(user) {
    var twitter = new Twitter(user.token, user.secret);
    return twitter.followers().then(function(followers) {
        return _.map(followers, function(f) {
            return f.toString();
        });
    });
}
