"use strict";

var Promise = require("bluebird"),
	twitter = include("apis/twitter/instance"),
    _ = require("lodash");

module.exports = function(user) {
	twitter.set(user.token, user.secret);
    return Promise.all(_.map(user.terms, function(term) {
        return twitter.get().search(term, user.sinceId);
    }));
};
