"use strict";

var twitter = include("twitter-oauth"),
    Promise = require("bluebird");

module.exports = function(token, secret) {
    return function(id) {
        return new Promise(function(resolve, reject) {
            debugger;
            twitter.favorites("create", { id: id }, token, secret, function(err, data) {
                if (err) reject(err);
                else resolve();
            });
        });
    };
};
