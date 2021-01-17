const mongoose = require("mongoose");
const emailValidator = require("email-validator");

const MessageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		index: {unique: true},
		validate: {
			validator: emailValidator.validate,
			message: (props) => `${props.value} is not a valid email address!`,
		},
	},
});

module.exports = mongoose.model("Message", MessageSchema);
