var mongoose        = require("mongoose");
    Users           = require("./user"),
    Comments         = require("./comment");

//connecting mongodb using mongoose
mongoose.connect("mongodb://localhost/YouUp1",{useNewUrlParser:true, useUnifiedTopology:true});


//building schema for post
post_schema = new mongoose.Schema({
    name        : String,
    image       : String,
    tag         : String,
    description : String,
    author      : String,
    
    comment : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Comments"
        }
    ]

});

//making module for accessing post data and exporting tha module
module.exports = mongoose.model("Posts",post_schema);