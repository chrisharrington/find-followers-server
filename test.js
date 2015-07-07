"use strict";

require("./lib/globals")

var twitter = include("twitter-oauth"),

    User = include("data/models").User,

    favourites = include("tasks/twitter-favourites"),

    _ = require("lodash");

include("data").initialize().then(function() {
    User.findOne({}, function(err, user) {
        favourites.go(user).then(function(tweets ) {
            console.log(tweets);
        }).catch(function(err) {
            console.log(err.stack);
        }).finally(function() {
            process.exit();
        });
    });
});

function _get(user, screenName, ids, cursor) {
    return new Promise(function(resolve, reject) {
        ids = ids || [];
        twitter.followers("ids", { screen_name: screenName, cursor: cursor }, user.token, user.secret, function(err, results) {
            if (err)
                reject(err);
            else {
                ids = ids.concat(results.ids);

                cursor = results.next_cursor_str;
                if (cursor !== "0")
                    return _get(user, screenName, ids, cursor).then(function() {
                        resolve(ids);
                    });

                resolve(ids);
            }
        });
    });
}
