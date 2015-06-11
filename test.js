"use strict";

require("./lib/globals");

var Pipeline = include("pipeline"),
    User = include("data/models").User,
	secretConfig = include("secret"),
    _ = require("lodash");

var accessToken = "14772674-fs5wiCen4dFIFmvtnS8xwwDZSpJWQP2U7RkbrLsFN",
	accessSecret = "qKwfVxETf1KgyXiaAPHs1ARX3oXdi31fzUswD8j3fBGT1";

include("data").initialize().then(function() {
    User.findOne({ name: "Chris Harrington" }, function(err, user) {
        if (err)
            console.error(err);
        else
            include("tasks/twitter-favourites").go(user).then(function(result) {
                console.log(_.map(result, function(tweet) {
                    return {
                        id: tweet.id,
                        date: tweet.created_at,
                        weight: tweet.weight
                    };
                }));
            }).catch(function(err) {
                console.error(err.stack);
            }).finally(function() {
                process.exit();
            });
    });
});
