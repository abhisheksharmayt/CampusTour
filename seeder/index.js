const mongoose = require('mongoose');
const Campus = require('../models/campus');
const colleges = require('./colleges');
const cities = require('./cities');
const campusImages = require('./images')

mongoose.connect('mongodb://localhost:27017/campustour', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log("Database Connected") })
    .catch((err) => {
        console.log("oh no there's some error")
        console.log(err);
    })

const generateRandomNum = (array)=> Math.floor(Math.random()*array.length);

const seed = async()=>{
    await Campus.deleteMany({});
    for(let i=0; i<50; i++){
        let randomCollege = generateRandomNum(colleges);
        let randomCity = generateRandomNum(cities);
        let randomImage = generateRandomNum(campusImages);
        const arr = colleges[randomCollege].college.split(' ');
        arr.pop();
        const c = new Campus({
            campus_name : arr.join(' '),
            location : colleges[randomCollege].college.split(' ').pop(),
            image : campusImages[randomImage],
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fugiat dicta tempora nulla delectus quasi quod laborum saepe dolorem, eos voluptate cumque sunt id nihil fugit, aliquam dignissimos odio animi.Fugiat veniam aliquam natus quae dolores.'
        });
        await c.save();
    }
}

seed().then(()=>{
    mongoose.connection.close();
})
