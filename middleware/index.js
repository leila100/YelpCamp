var Comment = require("../models/comment");
var Campground = require("../models/campground");

//All the middleware functions go here

var middlewareObj = {};

middlewareObj.checkCampgroundPermission = function (req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               req.flash("error", "Campground not found");
                res.redirect("back");
           } else {
               //if yes, does user own the campground?
               if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
               } else {
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentPermission = function (req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
                res.redirect("back");
           } else {
               //if yes, does user own the comment?
               if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
               } else {
                   req.flash("error", "You do not have permission to do that");
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }  
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
};


module.exports = middlewareObj;