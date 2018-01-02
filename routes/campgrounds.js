var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware"); // /index.js

//INDEX - Show all campgrounds
router.get("/", function(req,res){
    //get all campgrounds fro DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else{
           res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
       }
    });
});

//CREATE - Add campground to DB
router.post("/", middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name: name, image: image, price: price, description: description, author: author}
    //create a new campground and save to database
    Campground.create(newCamp, function(err, newCampground){
            if(err){
                console.log(err);
            } else {
                //redirect back to /campgrounds
                res.redirect("/campgrounds");
            }
        }
    )
});

//NEW - Form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - Info about a specific campground
router.get("/:id", function(req, res) {
    //Find campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

//EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundPermission, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE campground route
router.put("/:id", middleware.checkCampgroundPermission, function(req, res){
     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
            res.redirect("/campgrounds");
       } else {
           req.flash("success", "Campground successfully updated");
           res.redirect("/campgrounds/" + req.params.id);
       }
     });
});

//DESTROY route
router.delete("/:id", middleware.checkCampgroundPermission, function(req, res){
     Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
            res.redirect("/campgrounds");
       } else {
           req.flash("success", "Campground deleted");
           res.redirect("/campgrounds");
       }
     });
});

module.exports = router;