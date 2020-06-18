var mongoose        = require("mongoose");
    Users           = require("./user");

//connecting mongodb using mongoose
mongoose.connect("mongodb://localhost/YouUp1",{useNewUrlParser:true, useUnifiedTopology:true});


//building schema for post
comment_schema = new mongoose.Schema({
    text        : String,
    author_name : String,
    author      : String,
    post_time   : String,
    post_date   : String,
    author_image: String

});

//making module for accessing post data and exporting tha module
module.exports = mongoose.model("Comments",comment_schema);