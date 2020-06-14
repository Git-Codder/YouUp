var mongoose    = require("mongoose");

//connecting mongodb using mongoose
mongoose.connect("mongodb://localhost/YouUp_demo",{useNewUrlParser:true, useUnifiedTopology:true});


//building schema for user 
user_schema = new mongoose.Schema({
    name : String,
    image : String,
    post : []
});

//making module to access user data and exporting module
module.exports = mongoose.model("Users",user_schema);