const express = require("express");
const router = express.Router();
const Message = require("../modules/message");

router.post("/message", async (req, res, next) => {
	try {
		const {name, companyName, email} = req.body;
		const message = new Message({
			name: name,
			companyName: companyName,
			email: email,
		});

		const newMessage = await message.save();
		if (newMessage) {
			res.json({message: "Message received!"});
		} else {
			return next(new Error("Failed to save message for unknown reasons"));
		}
	} catch (error) {
		return next(err);
	}
});

module.exports = router;
