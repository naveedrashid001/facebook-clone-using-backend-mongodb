const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/Fb_DataBase`);

const userSchema = mongoose.Schema({
    // name:String,
    email:String,
    password:String,
    // age:Number
});

module.exports=mongoose.model("user", userSchema);