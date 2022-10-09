const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Campus = require('./models/campus');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/campustour', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log("Database Connected") })
    .catch((err) => {
        console.log("oh no there's some error") 
        console.log(err);
    })

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/campuses', async (req, res) => {
    const allcampus = await Campus.find({});
    res.render('campuses/index', {allcampus});
})

app.get('/campuses/new', async (req,res) => {
    res.render('campuses/new');
})

app.post('/campuses', async(req,res)=>{
    const newCampus = new Campus(req.body);
    await newCampus.save();
    res.redirect(`campuses/${newCampus._id}`);
})

app.get('/campuses/:id/edit', async(req,res)=>{
    const {id} = req.params;
    const campus = await Campus.findById(id);
    res.render('campuses/edit', {campus});
})

app.patch('/campuses/:id', async(req,res)=>{
    const {id} = req.params;
    await Campus.updateOne({_id : id}, req.body);
    res.redirect(`${id}`);
})

app.delete('/campuses/:id', async(req,res)=>{
    await Campus.findByIdAndDelete(req.params.id);
    res.redirect('/campuses');
})
app.get('/campuses/:id', async(req, res) =>{
    const {id} = req.params;
    const c = await Campus.findById(id);
    res.render('campuses/show', {c});
})
app.get('/',(req, res)=>{
    res.render('home'); 
})

app.listen(3000, () => {
    console.log("Connected at Port 3000");
})