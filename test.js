"use strict";

require("./lib/globals");

var scheduler = require("node-schedule"),
    _ = require("lodash"),
    Mongoose = require("mongoose"),
    moment = require("moment"),

    User = include("data/models").User,
    Log = include("data/models").Log,
    Favourite = include("data/models").Favourite,

    config = include("config"),
    twitterFavourites = include("tasks/twitter-favourites"),

    Twitter = include("apis/twitter");

include("data").initialize().then(function() {
    Log.remove({}, function(err) {
        User.findOne({}, function(err, user) {
            include("tasks/twitter-favourites").go(user).then(function(result) {
                console.log("Done.");
            }).catch(function(e) {
                console.log(e.stack || e);
            }).finally(function() {
                process.exit();
            });
        });
    });
});
