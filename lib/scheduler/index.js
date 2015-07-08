"use strict";

var scheduler = require("node-schedule"),
    _ = require("lodash"),

    User = include("data/models").User,

    config = include("config"),
    twitterFavourites = include("tasks/twitter-favourites");

module.exports = {
    go: function() {
        scheduler.scheduleJob(config.cron, function() {
            User.find({}, function(err, users) {
                if (err)
                    console.log(err.stack || err);
                else
                    _.each(users, function(user) {
                        twitterFavourites.go(user);
                    });
            });
        });
    }
};
