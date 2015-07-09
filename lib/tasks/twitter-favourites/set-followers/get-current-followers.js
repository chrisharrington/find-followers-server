"use strict";

var Twitter = include("apis/twitter");

module.exports = function(user) {
    var twitter = new Twitter(user.token, user.secret);
    return twitter.followers();
}
