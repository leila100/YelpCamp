var express     = require("express"),
    router      = express.Router(),
    User        = require("../models/user"),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware"); // /index.js

//SHOW info about a user
router.get("/:id", function(req, res) {
    //Find user with the provided id
    User.findById(req.params.id, function(err, foundUser){
       if(err){
           req.flash("error", "Can't find user");
           res.redirect("/");
       } else{
            //render show template with that user
            Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
                if(err){
                   req.flash("error", "Can't find user");
                   res.redirect("/");
               } else {
                    res.render("users/show", {user: foundUser, campgrounds: campgrounds});
               }
            });
       }
    });
});


//EDIT user info route
router.get("/:id/edit", function (req, res) {
   User.findById(req.params.id, function(err, foundUser){
     if(err){
       req.flash("error", "Can't find user");
       res.redirect("/");
     } else {
        res.render("users/edit", {user: foundUser});
     }
    });
});

//UPDATE user info route
router.put("/:id", function(req, res){
  User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
       if(err){
            req.flash("error", "Can't update user");
            res.redirect("/campgrounds");
       } else {
           req.flash("success", "User information successfully updated");
           res.redirect("/users/" + req.params.id);
       }
     });
});




module.exports = router;