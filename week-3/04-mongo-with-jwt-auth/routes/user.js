const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course} = require('../db/index')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username : username,
        password : password
    })
    .then(()=>{
        res.json({msg: 'User created successfully'})
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({
        username,
        password
    });
    if(user) {
        const token =  jwt.sign({username : username}, JWT_SECRET)
        res.json({token : token});
    } else {
        res.json('invalid cridentials');
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses =  await Course.find();
    res.json({
        courses : allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    // const username = req.username;
    const user = await User.updateOne(
        {username : req.username},
        {$push : {purchasedCourses : courseId}}
    );
    res.json('course added successfully');
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({username : req.username});    
    const courses = await Course.find({_id : user.purchasedCourses});
    res.json({mypurchases : courses});
});

module.exports = router