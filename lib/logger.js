var Log = include("data/models").Log,
    Promise = require("bluebird");

module.exports = function(userId) {
    this.info = function(message) {
        return _message(userId, "info", message);
    };

    this.error = function(message) {
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
