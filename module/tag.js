var mongoose    = require("mongoose"),
    Posts       = require("./post"),
    Users       = require('./user');

//connecting mongodb using mongoose
// mongoose.connect("mongodb://localhost/YouUp_3",{useNewUrlParser:true, useUnifiedTopology:true});
// mongoose.connect("mongodb+srv://aditya:A7232895082K&@#@*(%)*@youupdata.zew8k.mongodb.net/YouUp_data?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});
// mongoose.connect("mongodb+srv://aditya:iamtheaditya@youupdata.zew8k.mongodb.net/YouUpdata?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});
// mongoose.connect("mongodb+srv://aditya:iamtheaditya@youup.zew8k.mongodb.net/YouUp?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});

//building schema for YouUp databse tags collections
tags_schema = new mongoose.Schema({
    name : String,
    image : String,
    // author : {
    //     id : {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref  : "Users"
    //     },
    //     username : String
    // },
    post : [
        {
            id : String,
            name : String,
            image : { data: Buffer, contentType: String },
            author : String
        }
    ]
});

//making a model to accese database collection and exporting that module
module.exports = mongoose.model("Tags",tags_schema);
