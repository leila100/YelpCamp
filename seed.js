var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
    {
        name: "Bar Harbor Acadia",
        image: "http://www.acadiamagic.com/280x187/md-campground.jpg",
        description: "Maine communities such as Bar Harbor, Southwest Harbor, Somesville, Trenton, Sullivan, and others, offer diverse camping options for your visit to Acadia National Park. There currently are two campgrounds within the park on Mount Desert Island. However, there are several other excellent choices that are close that should be considered as well, some that are next to the ocean. The following information and links will aid you in your selection."
    },
    {
        name: "hostel",
        image: "http://www.loneconetrail.ca/sites/default/files/styles/header/public/header_images/campground-v2.jpg?itok=fqhTCtod",
        description: "25 campsites are thoughtfully positioned to maximize privacy and take advantage of a breathtaking white sand beach. There are three community stone fire pits among the sites to encourage guests to gather and cook their evening meals or to sit around and swap tales or sing songs. Campers are welcome to use the hostel kitchen for an additional $5 per day."
    },
    {
        name: "Russell Memorial",
        image: "https://parks.co.clark.wi.us/parks/i/li/l__campground_-_artistic.jpg",
        description: "Russell Memorial Park, Clark County's largest campground and park, is a premier location offering water frontage, ATV trail access, and full RV hookup. Russell Park and Campground offers a wide range of modern amenities sure to meet your camping and recreation needs. Campsites are offered bordering the beautiful Lake Arbutus."
    }
]

function seeDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed campgrounds!!");
            //Add a few campgrounds
            // data.forEach(function(seed){
            //   Campground.create(seed, function(err, campground){
            //       if(err){
            //           console.log(err);
            //       } else {
            //           console.log("added a campground");
            //           //Add a comment
            //           Comment.create(
            //               {
            //                   text: "It's a great campground!!!",
            //                   author: "Leila"
            //               }, function(err, comment){
            //                   if(err){
            //                       console.log(err);
            //                   } else {
            //                       campground.comments.push(comment);
            //                       campground.save();
            //                       console.log("created new comment!");
            //                   }
            //               });
            //       }
            //   });
            // });
        }
    });
}

module.exports = seeDB;
