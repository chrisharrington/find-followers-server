"use strict";

var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

module.exports = {
	name: "Log",
	schema: new Schema({
        level: { type: String, required: true },
        userId: { type: ObjectId, required: true },
        message: { type: String, required: true },

		created: { type: Date, default: Date.now }
	})
};
