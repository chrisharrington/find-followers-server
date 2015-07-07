// var existingFollowers = 100 most recent followers
// var potentialFollowers = _.map(tweets, function(tweet) { return { userId: tweet.user.id_str, term: _findTermInTweet(tweet) } });
// deleteDataFor(user)
// save(existingFollowers, potentialFollowers)

"use strict";

var Promise = require("bluebird"),
    _ = require("lodash"),

    twitter = include("twitter-oauth"),

    PotentialFollowers = include("data/models").PotentialFollowers;

module.exports = function(user, tweets) {
    return Promise.all([
        require("./get-existing-followers")(user),
        _getPotentialFollowers(tweets, user.terms)
    ]).spread(function(existingFollowers, potentialFollowers) {
        return _deleteDataFor(user).then(function() {
            return _save(user, existingFollowers, potentialFollowers);
        });
    });
};

function _deleteDataFor(user) {
    return new Promise(function(resolve, reject) {
        PotentialFollowers.find({ userId: user.twitterId }).remove(function(err) {
            if (err) reject(err);
            else resolve();
        });
    });
}

function _save(user, existingFollowers, potentialFollowers) {
    return new Promise(function(resolve, reject) {
        new PotentialFollowers({
            userId: user.twitterId,
            potentialFollowers: potentialFollowers,
            existingFollowers: existingFollowers
        }).save(function(err) {
            if (err) reject(err);
            else resolve();
        });
    });
};

function _getPotentialFollowers(tweets, terms) {
    return _.chain(tweets)
        .map(_extractPotentialFollowerInfoFromTweet.bind(this, terms))
        .uniq(function(pf) { return pf.id; })
        .value();
}

function _extractPotentialFollowerInfoFromTweet(terms, tweet) {
    var user = tweet.user;
    return {
        id: user.id_str,
        term: _findTermInTweet(terms, tweet)
    };
}

function _findTermInTweet(terms, tweet) {
    tweet.text = tweet.text.toLowerCase();
    return _.find(terms, function(term) {
        return tweet.text.indexOf(term.toLowerCase()) > -1;
    });
}
