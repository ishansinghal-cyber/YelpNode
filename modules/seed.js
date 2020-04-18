var mongoose = require("mongoose"),
	comments = require("./comments.js"),
	User     = require("./user.js"),
	camps    = require("./camps");

var data = [
	{
	name:"Morning Sun",
	image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
	body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
 	},
	{
		name:"Moons Cool",
		image:"https://images.unsplash.com/photo-1515444744559-7be63e1600de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
	},
	{
		name:"Sun Glory",
		image:"https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
	}
	
]

function seedDB(){
	camps.deleteMany({},function(err)
				{
		if(err){
			console.log(err)
		}
		else{
			//Remove all Comments and Users //
			//remove all camps
			console.log("Removed All Campgrounds")
			
			//add a few camps
			
			data.forEach(function(newcamp){
				camps.create(newcamp,function(err,addedcamp){
					if(err){
						console.log(err)
					}
					else{
						console.log("Added Campground");
						console.log("-----------------"),
						console.log("Adding A Comment");
						console.log("----------------");
						comments.create({
							comment : "Awesome Place",
							author  : "ABC"
						},function(err,comments){
							if(err){
								console.log(err)
							}
							else{
								addedcamp.comments.push(comments)
								addedcamp.save()
							}
						})
					}
				})
			})
		}
	})
}

function removeother(){
	User.deleteMany({},function(err){
		if(err){
			console.log(err)
		}
		else{
			console.log("==============================")
			console.log("All Previous Users are removed")
			console.log("==============================")
		}
	})
	comments.deleteMany({},function(err){
		if(err){
			console.log(err)
		}
		else{
			console.log("All Previous Comments are removed")
			console.log("=================================")
			seedDB()
		}
	})
}

module.exports = seedDB