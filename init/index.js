const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');


main().then((res) => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});
    try{
        initData.data = initData.data.map((obj) =>({
            ...obj,owner:"68639061810b5c073dd96248",
        }));
        await Listing.insertMany(initData.data,{ordered: false});
        console.log("data inserted");
    }catch(err){
        console.log(err);
    }
}

initDB();