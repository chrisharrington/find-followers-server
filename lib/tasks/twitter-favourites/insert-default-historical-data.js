"use strict";

var _ = require("lodash"),
    Promise = require("bluebird"),

    History = include("data/models").History;

module.exports = function(user, tweets) {
    var counts = _getDefaultCounts(user.terms);
    _incrementFavouriteCountPerTweet(counts, user.terms, tweets);
    return _save(user, _format(counts));
};

function _save(user, terms) {
    return new Promise(function(resolve, reject) {
        new History({
            userId: user._id,
            terms: terms
        }).save(function(err) {
            if (err) reject(err);
            else resolve();
        });
    });
}

function _format(counts) {
    var terms = [];
    for (var name in counts)
        terms.push({ term: name, favourites: counts[name], followers: 0 });
    return terms;
}

function _incrementFavouriteCountPerTweet(counts, terms, tweets) {
    _.each(tweets, function(tweet) {
        var text = tweet.text.toLowerCase();
        _.each(terms, function(term) {
            if (text.indexOf(term.toLowerCase()) > -1) {
                counts[term]++;
                return false;
            }
        });
    });
}

function _getDefaultCounts(terms) {
    var counts = {};
    _.each(terms, function(term) {
        counts[term] = 0;
    });
    return counts;
}
