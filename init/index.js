const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');



async function main() {
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
};

main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: '689f6bb68c6887da3986c748'}))//change userobjectID accordingly
    await Listing.insertMany(initData.data);
    console.log('Data was initialized');
};


initDB();   