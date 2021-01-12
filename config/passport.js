const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../modules/user");

module.exports = function (passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				callbackURL: "/auth/google/callback",
			},
			// this is for creating a new user in database
			async (accessToken, refreshToken, profile, done) => {
				const newUser = {
					googleID: profile.id,
					displayName: profile.displayName,
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
					image: profile.photos[0].value,
					email: profile.emails[0].value,
					token: accessToken,
				};

				try {
					let user = await User.findOne({googleID: profile.id});
					if (user) {
						req.session.user = user;
						done(null, user);
					} else {
						user = await User.create(newUser);
						req.session.user = user;
						done(null, user);
					}
				} catch (err) {
					console.error(err);
				}
			}
		)
	);

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};
