var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seed");

//requiring routes    
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index"),
    userRoutes       = require("./routes/users");

//create database
mongoose.Promise = global.Promise; 
//use export DATABASEURL=mongodb://localhost/yelp_camp in the console for c9
//use export DATABASEURL=mongodb://Leila:password@ds155424.mlab.com:55424/leilayelpcamp in heroku
console.log(process.env.DATABASEURL);

mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
// mongoose.connect("mongodb://Leila:password@ds155424.mlab.com:55424/leilayelpcamp", {useMongoClient: true});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

//Seed the database
// seedDB();

//passport configuration
app.use(require("express-session")({
    secret: "Am getting better at it!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//to be able to access current user in other files
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.errorMessage = req.flash("error");
   res.locals.successMessage = req.flash("success");
   next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/users", userRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp server started") 
});