var mongoose        = require("mongoose");
    Users           = require("./user"),
    Comments         = require("./comment");

//connecting mongodb using mongoose
// mongoose.connect("mongodb://localhost/YouUp_3",{useNewUrlParser:true, useUnifiedTopology:true});
// mongoose.connect("mongodb+srv://aditya:A7232895082K&@#@*(%)*@youupdata.zew8k.mongodb.net/YouUp_data?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});
// mongoose.connect("mongodb+srv://aditya:iamtheaditya@youupdata.zew8k.mongodb.net/YouUpdata?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});
// mongoose.connect("mongodb+srv://aditya:iamtheaditya@youup.zew8k.mongodb.net/YouUp?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});

//building schema for post
post_schema = new mongoose.Schema({
    name        : String,
    image       : { data: Buffer, contentType: String },
    tag         : String,
    description : String,
    author      : String,
    post_time   : String,
    post_date   : String,
    like_count  : Number,

    like_user   : Array,
    
    comment : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Comments"
        }
    ],

    index        : Number

});

//making module for accessing post data and exporting tha module
module.exports = mongoose.model("Posts",post_schema);