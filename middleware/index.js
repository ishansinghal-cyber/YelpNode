var middleware = {};

var camps   = require("../modules/camps.js"),
	comment = require("../modules/comments.js");

middleware.checkCampOwnership= function(req,res,next){
	if(req.isAuthenticated()){
		camps.findById(req.params.id,function(err,foundedcamp){
			if(err){
				res.flash("Campground Not Found")
				res.redirect("back")
			}
			else{
				if(foundedcamp.author.id.equals(req.user.id)){
					next()
				}
				else{
					req.flash("error","You are not authorized")
					res.redirect("back")
				}
			}
		})
	}
	else{
		req.flash("error","You are not logged in Please Login First")
		res.redirect("/login")
	}
}

middleware.isLoggedin= function(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}
	req.flash("error","Please Login First");
	res.redirect("/login")
}

middleware.checkCommentOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id,function(err,foundedcomment){
			if(err){
				req.flash("error","Comment Not Found")
				res.redirect("back")
			}
			else{
				if(foundedcomment.author.id.equals(req.user.id)){
					next()
				}
				else{
					req.flash("error","You are not authorized")
					res.redirect("back")
				}
			}
		})
	}
	else{
		req.flash("error","You are not signed in")
		res.redirect("/login")
	}
}


module.exports = middleware;