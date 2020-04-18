var mongoose   = require("mongoose");
	
var campschema = new mongoose.Schema({
	name:String,
	image:String,
	body:String,
	price:String,
	author : {
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Users"
		},
		username:String
	},
	
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"comments"
	}]
});

module.exports = mongoose.model("camps",campschema)