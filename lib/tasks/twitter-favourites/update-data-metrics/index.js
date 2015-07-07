"use strict";

var Promise = require("bluebird"),
    _ = require("lodash"),

    Pipeline = include("pipeline");

module.exports = function(user, tweets) {
    return require("./update-historical-data")(user, tweets).then(function() {
        return require("./save-potential-follower-info")(user, tweets);
    });
};
