/* eslint-disable no-underscore-dangle, func-names, prefer-arrow-callback */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,
	},
	surname: {
		type: String,
		trim: true,
	},
	location: {
		type: String,
		trim: true,
	},
});

UserSchema.index({ name: 'text', surname: 'text', location: 'text' });

module.exports = mongoose.model('User', UserSchema);
