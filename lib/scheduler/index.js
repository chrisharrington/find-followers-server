"use strict";

var scheduler = require("node-schedule"),

    config = include("config"),
    twitterFavourites = include("tasks/twitter-favourites");

module.exports = {
    go: function() {
        scheduler.scheduleJob(config.cron, function() {
            twitterFavourites.go();
        });
    }
};
