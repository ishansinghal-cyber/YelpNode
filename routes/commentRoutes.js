var express    = require("express"),
	router     = express.Router({mergeParams:true}),
	camps      = require("../modules/camps.js"),
	middleware = require("../middleware"),
	comment    = require("../modules/comments.js");
//Comment Routes //

//Comment Add Form Route//
router.get("/new",middleware.isLoggedin,function(req,res){
	camps.findById(req.params.id,function(err,foundedcamp){
		if(err){
			req.flash("error","An Error Occured Please try after sometime")
			res.redirect("back")
		}
		else{
			res.render("commentForm",{camp:foundedcamp})
		}
	})
})
//Comment Add Form Route//

//Add the comment ROute//
router.post("/",middleware.isLoggedin,function(req,res){
	camps.findById(req.params.id,function(err,foundedcamp){
		if(err){
			req.flash("error","An Error Occured Please try after sometime")
			res.redirect("back")
		}
		else{
			comment.create(req.body.comment,function(err,createdComment){
				if(err){
					console.log(err)
				}
				else{
               		createdComment.author.id = req.user._id;
               		createdComment.author.username = req.user.username;
               		//save comment
               		createdComment.save();
					foundedcamp.comments.push(createdComment)
					foundedcamp.save()
					req.flash("success","Comment Added")
					res.redirect("/campgrounds/"+req.params.id)
				}
			})
		}
	})
})

//Add THe COmment Route//


//Edit Form Route //

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	comment.findById(req.params.comment_id,function(err,foundedcomment){
		if(err){
			req.flash("error","An Error Occured Please try after sometime")
			res.redirect("back")
		}
		else{
			res.render("../views/comments/edit",{comment:foundedcomment,campground_id : req.params.id})
		}
	})
})

//Update Route for comments //

router.put("/:comment_id/",middleware.checkCommentOwnership,function(req,res){
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			req.flash("error","An Error Occured Please try after sometime")
			res.redirect("/campgrounds"+req.params.id)
		}else{
			req.flash("success","Comment Edited")
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
})

//Delete Request//

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			req.flash("error","An Error Occured Please try after sometime")
			res.redirect("back")
		}
		else{
			req.flash("success","Comment Deleted")
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
})




//=============================================================================//
module.exports = router;
