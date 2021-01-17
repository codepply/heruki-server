const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//declarations
const app = express();
const PORT = process.env.PORT || 8080;

// application wide use
app.use(express.json());
app.use(
	cors({
		origin: process.env.ORIGIN,
	})
);

// database connection
mongoose.connect(
	`mongodb+srv://${process.env.HOST}:${process.env.PASSWORD}@zeus.uem0p.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	}
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log(`Connected to the server! Database: ${process.env.DB}`);
});

//routes

app.use("/auth", require("./routes/auth"));

app.use("/api", require("./routes/message"));

app.get("/", (req, res) => {
	res.json({message: "Hello from server"});
});

//run listen port
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
