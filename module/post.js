var mongoose    = require("mongoose");

//connecting mongodb using mongoose
mongoose.connect("mongodb://localhost/YouUp_user",{useNewUrlParser:true, useUnifiedTopology:true});


//building schema for post
post_schema = new mongoose.Schema({
    name        : String,
    image       : String,
    description : String
    
});

//making module for accessing post data and exporting tha module
module.exports = mongoose.model("Posts",post_schema);