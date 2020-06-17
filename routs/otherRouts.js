var express     = require('express'),
    router      = express.Router(),
    Tags        = require("../module/tag"),
    Posts       = require("../module/post"),
    Users_detail       = require("../module/user_detail"),
    Users = require("../module/user");


//===================================
//Other routs
//===================================

//get request for about page
router.get("/about",function(req,res){
    res.render("other/about");
});



module.exports = router;