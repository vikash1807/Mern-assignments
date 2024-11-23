const { Router } = require("express");
const jwt = require('jsonwebtoken')
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { User, Course, Admin} = require('../db/index');
const { JWT_SECRET } = require("../config");

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username : username,
        password : password
    })
    .then(()=>{
        res.json({msg: 'Admin created successfully'})
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await Admin.findOne({
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

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    });
    res.json({
        msg : 'course added succesfully',
        courseId : newCourse._id
    });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses =  await Course.find();
    res.json({
        courses : allCourses
    })
});

module.exports = router;