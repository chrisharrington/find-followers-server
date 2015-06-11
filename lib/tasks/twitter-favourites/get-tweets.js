"use strict";

var Promise = require("bluebird"),
	Twitter = include("apis/twitter"),
    _ = require("lodash");

module.exports = function(user) {
	var twitter = new Twitter(user.token, user.secret);
    return Promise.all(_.map(user.terms, function(term) {
        return twitter.search(term, user.sinceId);
    }));
};