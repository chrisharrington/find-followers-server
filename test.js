"use strict";

require("./lib/globals");

var scheduler = require("node-schedule"),
    _ = require("lodash"),

    User = include("data/models").User,

    config = include("config"),
    twitterFavourites = include("tasks/twitter-favourites");

include("data").initialize().then(function() {
    User.find({}, function(err, users) {
        if (err)
            console.log(err.stack || err);
        else
            _.each(users, function(user) {
                twitterFavourites.go(user).then(function() {
                    console.log(user.name + " done.");
                }).catch(function(e) {
                    console.log(user.name);
                    console.log(e);
                });
            });
    });
});
