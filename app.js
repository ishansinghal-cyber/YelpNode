var express    				= require("express"),
	app        				= express(),
	mongoose   				= require("mongoose"),
	methodOverride 			= require("method-override"),
	bodyparser			    = require("body-parser"),
	flash 					= require("connect-flash"),
	passport   				= require("passport"),
	localStrategy 			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose"),
	
	//Module Custom FILES //
	camps	     = require("./modules/camps.js"),
	comment    	 = require("./modules/comments.js"),
	seedDB	     = require("./modules/seed.js"),
	User         = require("./modules/user.js");

//Requiring ROutes//
var commentRoutes         = require("./routes/commentRoutes.js"),
	campRoutes            = require("./routes/campRoutes.js"),
	authRoutes            = require("./routes/authRoutes.js");



//Monggose Config//

mongoose.connect(process.env.dburl,{
	useNewUrlParser    : true,
	useUnifiedTopology : true
})

//=======================//

//app.use default configs//

app.use(flash());

app.set("view engine","ejs");

app.use(express.static(__dirname+ "/public"))

console.log(__dirname)

app.use(bodyparser.urlencoded({ extended: true }));

//Passport configs //

app.use(require("express-session")({
	secret:"CampPro App is gr8",
	resave:false,
	saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//===================================================//
//==========================================//

app.use(methodOverride("_method"))

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error     = req.flash("error");
	res.locals.success     = req.flash("success");
	next()
})

app.use("/campgrounds",campRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(authRoutes);

//Listen //
app.listen(process.env.PORT,process.env.IP,function(){
	console.log("CampPro Server is Started")
});