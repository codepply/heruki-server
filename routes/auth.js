const express = require("express");
const router = express.Router();
const UserModel = require("../modules/user");
const jwt = require("jsonwebtoken");
const {createJWT} = require("../middleware/auth");
require("dotenv").config();

router.post("/sign-up", async (req, res, next) => {
	try {
		const {email, password, name} = req.body.data;
		const user = new UserModel({
			email: email,
			password: password,
			name: name,
		});
		const savedUser = await user.save();

		if (savedUser) {
			res.json({message: "User created successfully"});
		} else {
			return next(new Error("Failed to save user for unknown reasons"));
		}
	} catch (err) {
		return next(err);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const {email, password} = req.body.data;
		const user = await UserModel.findOne({email: email}).exec();
		if (!user) {
			return res.status(404).json({message: "User not found"});
		}
		const passwordOk = await user.comparePassword(password);
		if (!passwordOk) {
			return res.status(404).json({message: "User not found"});
		}
		let accessToken = createJWT(user.email, user._id, 3600);
		jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, decoded) => {
			if (err) {
				res.status(500).json({error: err});
			}
			if (decoded) {
				return res.status(200).json({
					success: true,
					token: accessToken,
					message: user,
				});
			}
		});
	} catch (error) {
		res.status(500).json({errors: error});
	}
});

module.exports = router;
