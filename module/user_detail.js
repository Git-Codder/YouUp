var mongoose                = require('mongoose'),
    passportLocalMongoose   = require("passport-local-mongoose");

var user_detail_schema = new mongoose.Schema({
        username : String,
        password  : String
});

//pluging passportlocalmongoose to use more functions in schema model
user_detail_schema.plugin(passportLocalMongoose);

//exporting model
module.exports = mongoose.model("Users_details",user_detail_schema);