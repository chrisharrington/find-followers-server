"use strict";

require("./lib/globals");

var scheduler = require("node-schedule"),
    _ = require("lodash"),

    User = include("data/models").User,

    config = include("config"),
    twitterFavourites = include("tasks/twitter-favourites"),

    Twitter = include("apis/twitter");

include("data").initialize().then(function() {
    User.findOne({}, function(err, user) {
        twitterFavourites.go(user).then(function() {
            console.log("Done.");
        }).catch(function(e) {
            console.log(e.stack || e);
        }).finally(function() {
            process.exit();
        });
    });
});
