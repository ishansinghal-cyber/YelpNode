var express    = require("express"),
	camps      = require("../modules/camps.js"),
	comments   = require("../modules/comments.js"),
	middleware = require("../middleware"),
	router     = express.Router();

//Index Route to view all campgrounds//

router.get("/",function(req,res){
	camps.find(function(err,allcampgrounds){
		if(err){
			console.log(err)
		}
		else{
			res.render("index",{campgrounds:allcampgrounds})
		}
	})
})

//Route which shows the form to add //

router.get("/new",middleware.isLoggedin,function(req,res){
	res.render("new")
});

//Route to add new Campgrounds//

router.post("/",middleware.isLoggedin,function(req,res){
	var ground = req.body.campground;
	var author = {
		id:req.user._id,
		username:req.user.username
	}
	var newcamp = {name:ground.name,image:ground.image,body:ground.body,price:ground.price,author:author}
	camps.create(newcamp,function(err,){
		if(err){
			req.flash("error","An Error Occured Please try after sometime")
			console.log(err)
			res.redirect("back")
		}
		else{
			req.flash("success","Campground Added")
			res.redirect("/campgrounds")
		}
	})
});


//Show Route//

router.get("/:id",function(req,res){
	camps.findById(req.params.id).populate("comments").exec(function(err,foundedcamp){
		if(err){
			req.flash("error","An Error Occured Please try after sometime")
			res.redirect("back")
		}
		else{
			res.render("show",{campground:foundedcamp})
		}
	})
})


//Edit ROute//

router.get("/:id/edit",middleware.checkCampOwnership,function(req,res){
			camps.findById(req.params.id,function(err,foundedcamp){
				res.render("campgrounds/edit",{campground : foundedcamp})	

	})	
})

router.put("/:id/",middleware.checkCampOwnership,function(req,res){
	camps.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			req.flash("error","An Error Occured Please try after sometime")
			res.redirect("/campgrounds"+req.params.id)
		}
		else{
			req.flash("success","Campground Updated")
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
})

//Destroy Route//

router.delete("/:id",middleware.checkCampOwnership,function(req,res){
	camps.findByIdAndRemove(req.params.id,function(err){
		if(err){
			req.flash("error","An Error Occured Please try after sometime")
			res.redirect("/campgrounds/"+req.param.id)
		}
		else{
			req.flash("success","Campground Deleted")
			res.redirect("/campgrounds")
		}
	})
})


//Middleware//





module.exports = router;