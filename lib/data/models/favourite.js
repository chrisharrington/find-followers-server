"use strict";

var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var favourite = {
	name: "Favourite",
	schema: new Schema({
        userId: { type: ObjectId },
		twitterId: { type: String },
		created: { type: Date, default: Date.now },
        term: { type: String }
	})
};

favourite.schema.index({ userId: 1 });

module.exports = favourite;
