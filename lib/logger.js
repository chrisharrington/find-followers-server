var Log = require("data/models").Log,
    Promise = require("bluebird");

module.exports = {
    info: function(userId, message) {
        return _message(userId, "info", message);
    },

    error: function(message) {
        return _message(userId, "error", message);
    }
}

function _message(userId, level, message) {
    return new Promise(function(resolve, reject) {
        new Log({
            userId: userId,
            level: level,
            message: message
        }).save(function(err) {
            if (err) reject(err);
            else resolve();
        });
    });
}
