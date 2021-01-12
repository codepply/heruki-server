const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserModel = require("../modules/user");

router.get(
	"/google",
	passport.authenticate("google", {scope: ["profile", "email"]})
);

router.get(
	"/google/callback",
	passport.authenticate("google", {failureRedirect: "/"}),
	(req, res) => {
		// const token = req.user.token;
		res.redirect("http://localhost:3000/dashboard");
	}
);

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
	} catch (error) {}
});

module.exports = router;
