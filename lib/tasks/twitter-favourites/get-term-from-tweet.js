"use strict";

var _ = require("lodash");

module.exports = function(user, tweet) {
    var text = tweet.text.toLowerCase(),
        found;

    _.each(user.terms, function(term) {
        if (text.indexOf(term.toLowerCase()) > -1) {
            found = term;
            return false;
        }
    });

    return found;
};
