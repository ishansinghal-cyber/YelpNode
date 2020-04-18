var express = require("express"),
	passport = require("passport"),
	User     = require("../modules/user.js"),
	router   = express.Router();

router.get("/",function(req,res){
	res.render("landing")
});


router.get("/register",function(req,res){
	res.render("register")
})

router.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome " + req.user.username)
			res.redirect("/campgrounds")
		})
	})
})

//Login Route//

router.get("/login",function(req,res){
	res.render("login")
})

router.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),function(req,res){})


//Logout Route//

router.get("/logout",function(req,res){
	req.logout()
	req.flash("success","Logout Successfull")
	res.redirect("/campgrounds")
})

module.exports = router;