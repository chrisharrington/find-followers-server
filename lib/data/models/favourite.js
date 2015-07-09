"use strict";

var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

module.exports = {
	name: "Favourite",
	schema: new Schema({
        userId: { type: ObjectId },
		twitterId: { type: String },
		created: { type: Date, default: Date.now },
        term: { type: String }
	})
};
