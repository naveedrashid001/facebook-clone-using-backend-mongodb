const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");


const profileRoute = require("./routes/profileRoute");
const signupRoutes = require("./routes/signupRoutes");

const app = express();
const port = 4000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/Fb_DataBase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    // console.log("MongoDB connected");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Routes
app.use("/api", profileRoute);
app.use("/api", signupRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
