"use strict";

var Promise = require("bluebird"),
    _ = require("lodash"),

    User = include("data/models").User;

module.exports = function() {
    return new Promise(function(resolve, reject) {
        User.find({}, function(err, users) {
            if (err) reject(err);
            else resolve(_.indexBy(users, "_id"));
        });
    });
};
