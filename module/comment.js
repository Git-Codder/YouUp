var mongoose        = require("mongoose");
    Users           = require("./user");

//connecting mongodb using mongoose
// mongoose.connect("mongodb://localhost/YouUp1",{useNewUrlParser:true, useUnifiedTopology:true});
// mongodb+srv://aditya:<password>@youupdata.zew8k.mongodb.net/<dbname>?retryWrites=true&w=majority

// mongoose.connect("mongodb+srv://aditya:A7232895082K&@#@*(%)*@youupdata.zew8k.mongodb.net/YouUp_data?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});
// mongoose.connect("mongodb+srv://aditya:iamtheaditya@youupdata.zew8k.mongodb.net/YouUpdata?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});
mongoose.connect("mongodb+srv://aditya:iamtheaditya@youup.zew8k.mongodb.net/YouUp?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});

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