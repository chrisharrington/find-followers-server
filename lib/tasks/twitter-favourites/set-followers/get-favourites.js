"use strict";

var Promise = require("bluebird"),

    config = include("config"),

    Favourite = include("data/models").Favourite,

    Logger = include("logger");

module.exports = function(user) {
    var logger = new Logger(user._id);

    return logger.info("Retrieving favourites.").then(function() {
        return new Promise(function(resolve, reject) {
            Favourite
                .find({ userId: user._id })
                .sort("-created")
                .limit(config.favouriteCount)
                .exec(function(err, favourites) {
                    if (err) reject(err);
                    else resolve(favourites);
                });
        }).then(function(favourites) {
            return logger.info("Retrieved favourites: " + favourites.length).then(function() {
                return favourites;
            });
        });
    });
};
