"use strict";

module.exports = function(tweet) {
    var text = tweet.text.toLowerCase();
    if (text.indexOf("job") > -1 || text.indexOf("hire") > -1)
        tweet.weight -= 2;

    var screenName = tweet.user.screen_name.toLowerCase();
    if (screenName.indexOf("job") > -1 || screenName.indexOf("hire") > -1)
        tweet.weight -= 2;
        
    return tweet;
};
