const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("MONGO OH NO ERROR!!!!")
        console.log(err)
    })

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const  seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6488779d66bbefebc594eaf4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Nature's first green is gold, Her hardest hue to hold. Her early leaf's a flower; But only so an hour. Then leaf subsides to leaf. So Eden sank to grief, So dawn goes down to day. Nothing gold can stay.",
            price,
            geometry: {
                    type: "Point",
                    coordinates:  [
                            cities[random1000].longitude,
                            cities[random1000].latitude
                    ]
                },
            images: [
                {
                    url: 'https://res.cloudinary.com/drujd9npo/image/upload/v1686757500/YelpCamp/dx0vud9ft0uu4nowdnpx.png',
                    filename: 'YelpCamp/dx0vud9ft0uu4nowdnpx'
                },
                {
                    url: 'https://res.cloudinary.com/drujd9npo/image/upload/v1686757500/YelpCamp/otxky78au6zxtlfwo5vw.png',
                    filename: 'YelpCamp/otxky78au6zxtlfwo5vw'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
}) ;