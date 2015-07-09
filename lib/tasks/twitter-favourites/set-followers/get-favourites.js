"use strict";

var Promise = require("bluebird"),

    config = include("config"),

    Favourite = include("data/models").Favourite;

module.exports = function(user) {
    return new Promise(function(resolve, reject) {
        Favourite
            .find({ userId: user._id })
            .sort("-created")
            .limit(config.favouriteCount)
            .exec(function(err, favourites) {
                if (err) reject(err);
                else resolve(favourites);
            });
    });
};
