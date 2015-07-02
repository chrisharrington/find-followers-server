"use strict";

var Twitter = include("apis/twitter");

module.exports = new function(token, secret) {
    this.set = function(token, secret) {
        return this.twitter = new Twitter(token, secret);
    };

    this.get = function() {
        return this.twitter;
    };
}
