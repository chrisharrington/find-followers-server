"use strict";

var Promise = require("bluebird"),

    Log = include("data/models").Log;

module.exports = function(skip, limit) {
    return new Promise(function(resolve, reject) {
        Log
            .find({})
            .sort("-created")
            .limit(limit)
            .skip(skip)
            .exec(function(err, logs) {
                if (err) reject(err);
                else resolve(logs);
            });
    });
};
