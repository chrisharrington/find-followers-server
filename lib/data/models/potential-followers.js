"use strict";

var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

module.exports = {
	name: "PotentialFollowers",
	schema: new Schema({
		userId: { type: String },
        created: { type: Date, default: Date.now },
        potentialFollowers: { type: Array, default: [] },
        existingFollowers: { type: Array, default: [] }
	})
};
