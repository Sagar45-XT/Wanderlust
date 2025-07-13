const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
     let allListings = await Listing.find({});
     res.render('index.ejs',{allListings});
};

module.exports.newGetListing = (req, res) => {
    res.render("new.ejs");
};

module.exports.createListing = async(req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
    }).send();

        let url = req.file.path;
        let filename = req.file.filename;
        let newListing= new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url, filename};
        newListing.geometry = response.body.features[0].geometry;
        console.log(newListing);
        let xyz= await newListing.save();
            console.log(xyz);
        req.flash("success","New listing created successfully!");
        res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listId = await Listing.findById(id)
    .populate({path: "reviews",
        populate:{path: "author",},
    })
    .populate("owner");
    if(!listId){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("show.ejs",{listId});
};

module.exports.renderEditForm = async (req,res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_170,w_250");
    res.render("edit.ejs", {listing, originalImageUrl});
};

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        console.log(url, filename);
        listing.image = {url, filename};
        await listing.save();
    };
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    const deletedListing= await Listing.findOneAndDelete({_id: id});
    req.flash("success","Listing deleted!");
    res.redirect("/listings");
};
