"use strict";

var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
 
module.exports = {
	name: "User",
	schema: new Schema({
		name: { type: String, required: true },
		handle: { type: String, required: true },
		created: { type: Date, default: Date.now },
		token: { type: String, required: true },
		secret: { type: String, required: true },
		terms: { type: Array, default: [] },
		image: { type: String },
        sinceId: { type: Number }
	})
};