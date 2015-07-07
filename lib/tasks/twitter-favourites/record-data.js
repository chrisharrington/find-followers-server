"use strict";

var Promise = require("bluebird"),
    _ = require("lodash"),
    Pipeline = include("pipeline"),

    twitter = include("twitter-oauth"),

    Followers = include("data/models").Followers;

module.exports = function(user, tweets) {
    return _getFollowers(user).then(function(followers) {
        return _updateMostRecentData(user, followers).then(function() {
            return _addNewData(user, followers, _getPotentialFollowers(tweets));
        });
    });
};

function _getFollowers(user) {
    return new Promise(function(resolve, reject) {
        twitter.followers("ids", { screen_name: user.handle }, user.token, user.secret, function(err, followers) {
            if (err) reject(err);
            else resolve(followers.ids);
        });
    });
}

function _updateMostRecentData(user, followers) {
    return new Promise(function(resolve, reject) {
        Followers
            .find({})
            .limit(1)
            .sort("-date")
            .exec(function(err, results) {
                if (err)
                    reject(err);
                else {
                    var data = results[0];
                    if (data) {
                        data.newFollowers = followers.length;
                        data.save(function(err) {
                            if (err) reject(err);
                            else resolve();
                        });
                    }
                    else
                        resolve();
                }
            });
    });
}

function _addNewData(user, currentFollowers, potentialFollowers) {
    return new Promise(function(resolve, reject) {
        new Followers({
            userId: user.id,
            currentFollowers: currentFollowers,
            potentialFollowers: potentialFollowers
        }).save(function(err, created) {
            if (err) reject(err);
            else resolve();
        });
    });
}

function _getPotentialFollowers(tweets) {
    var potentialFollowers = _.chain(tweets)
        .map(_extractUserFromTweet)
        .uniq(function(pf) { return pf.id; })
        .value();
}

function _extractUserFromTweet(tweet) {
    var user = tweet.user;
    return {
        id: user.id_str,
        name: user.name,
        handle: user.screen_name,
        description: user.description
    };
}
