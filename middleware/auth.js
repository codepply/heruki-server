const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
	preprocessPass: function (password) {
		bcrypt.genSalt(saltRounds, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				console.log(hash);
			});
		});
	},
};
