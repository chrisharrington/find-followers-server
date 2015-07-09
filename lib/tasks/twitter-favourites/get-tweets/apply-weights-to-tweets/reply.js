"use strict";

module.exports = function(tweet) {
    if (tweet.in_reply_to_user_id_str !== null || tweet.in_reply_to_status_id_str !== null || tweet.in_reply_to_screen_name !== null)
        tweet.weight -= 2;
    return tweet;
};
