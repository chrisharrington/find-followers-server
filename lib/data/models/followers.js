"use strict";

var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

module.exports = {
	name: "Followers",
	schema: new Schema({
		userId: { type: String },
        created: { type: Date, default: Date.now },
        potentialFollowers: { type: Array, default: [] },
        currentFollowers: { type: Array, default: [] },
		newFollowers: { type: Number, default: 0 }
	})
};
