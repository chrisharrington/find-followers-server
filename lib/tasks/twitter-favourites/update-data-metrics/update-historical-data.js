"use strict";

var Promise = require("bluebird"),
    _ = require("lodash"),

    PotentialFollowers = include("data/models").PotentialFollowers,
    History = include("data/models").History;

module.exports = function(user, tweets) {
    return Promise.all([
        _getPotentialFollowerData(user),
        require("./get-existing-followers")(user)
    ]).spread(_diff.bind(this, user));
};

function _diff(user, potentialFollowerData, existingFollowers) {
    var preexistingFollowers = potentialFollowerData.existingFollowers;

    var counts = _getDefaultCounts(user.terms);
    _.each(_.difference(existingFollowers, preexistingFollowers), _incrementFollowerCount.bind(this, counts, potentialFollowerData));
    return _save(user, counts);
}

function _save(user, counts) {
    return new Promise(function(resolve, reject) {
        History.findOne({ userId: user._id }, "-created", function(err, history) {
            if (err)
                reject(err);
            else {
                for (var name in counts) {
                    _.each(history.terms, function(term) {
                        if (term.term === name)
                            term.followers = counts[name];
                    });
                }

                history.markModified("terms");
                history.save(function(err) {
                    if (err) reject(err);
                    else resolve();
                });
            }
        });
    });
}

function _incrementFollowerCount(counts, data, follower) {
    var term = _.find(data.potentialFollowers, function(pf) {
        return pf.id == follower;
    }).term;
    counts[term]++;
}

function _getDefaultCounts(terms) {
    var counts = {};
    _.each(terms, function(term) {
        counts[term] = 0;
    });
    return counts;
}

function _getPotentialFollowerData(user) {
    return new Promise(function(resolve, reject) {
        PotentialFollowers.findOne({ userId: user.twitterId }, function(err, potentialFollowers) {
            if (err) reject(err);
            else resolve(potentialFollowers);
        });
    });
}
