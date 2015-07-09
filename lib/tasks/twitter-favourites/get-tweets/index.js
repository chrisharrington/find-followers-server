"use strict";

var Promise = require("bluebird"),
    Pipeline = include("pipeline");

module.exports = function(user) {
    return new Pipeline([
        require("./get-tweets"),
        require("./flatten-tweets"),
        require("./filter-favourites"),
        require("./apply-weights-to-tweets").bind(this, user),
        require("./sort-tweets"),
        require("./take-max-tweets")
    ]).go(user);
};
