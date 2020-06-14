var mongoose    = require("mongoose"),
    Posts       = require("./post");

//connecting mongodb using mongoose
mongoose.connect("mongodb://localhost/YouUp_demo",{useNewUrlParser:true, useUnifiedTopology:true});


//building schema for YouUp databse tags collections
tags_schema = new mongoose.Schema({
    name : String,
    image : String,
    post : [
        {
            type    : mongoose.Schema.Types.ObjectId,
            ref     : "Posts",
            required: true
        }
    ]
});

//making a model to accese database collection and exporting that module
module.exports = mongoose.model("Tags",tags_schema);
