const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

require("dotenv").config();

//declarations
const app = express();
const PORT = process.env.PORT || 8080;

//passport config
require("./config/passport")(passport);
// application wide use
app.use(express.json());
app.use(
	cors({
		origin: process.env.ORIGIN,
	})
);

app.use(passport.initialize());
app.use(passport.session());

// database connection
mongoose.connect(
	`mongodb+srv://${process.env.HOST}:${process.env.PASSWORD}@zeus.uem0p.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log(`Connected to the server! Database: ${process.env.DB}`);
});

//routes

app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
	res.json({message: "hello"});
});

app.get("/api/hello", (req, res) => {
	res.json({message: "hello from server"});
});

app.post("/api/hello", (req, res) => {
	const {name, email, companyName} = req.body;
	// res.json({
	// 	message: "This is what you sent",
	// 	name: name,
	// 	email: email,
	// 	companyName: companyName,
	// });
	res.json({
		status: "Message Received!",
	});
});

//run listen port
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
