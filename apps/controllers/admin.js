var express = require("express");
var router = express.Router();
var user_md = require("../models/user");

router.get("/", function(req, res){
    res.json({"message" : "This is admin page"});
});

router.get("/signup", function(req, res){
    res.render("signup", {data : {}});
});

router.post("/signup", function(req, res){
   var user = req.body;
  
   if(user.email.trim().length == 0){
       res.render("signup", {data : {error: "Email is required"}});
   }

   if(user.passwd != user.repasswd && user.passwd.trim().length != 0){
       res.render("signup", {data : {error: "Password is not match"}});
   }

   user = {
       email: user.email,
       password: user.passwd,
       first_name: user.firstname,
       last_name: user.lastname
   };

   var result = user_md.addUser(user);
   if(!result){
       res.render("signup", {data : {error: "Could not insert data user to DB"}});
   } else {
       res.json({"message" : "Insert successfully"});
   }
});

module.exports = router;