const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utility/wrapAsync.js");
const {validateReview ,isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controller/reviews.js");

//post review route......
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));

//Delete review route.....
router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(
       reviewController.destroyReview
    )
)

module.exports = router;