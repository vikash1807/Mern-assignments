const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index")

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

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find();
    res.json({
        courses : response
    });

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne(
        {username : username},
        {$push : {purchasedCourses : courseId}}
    );
    res.json({msg : 'Course purchased successfully'});
});


router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;

    // const user = await User.findOne({username : username});   
    // console.log(user.purchasedCourses); // will give all purchased course ids.
    // const courses = await Course.find({
    //     _id : user.purchasedCourses
    // });
    // res.json({Courses : courses});

    const user = await User.findOne({ username: username })
    .populate('purchasedCourses').exec();

    res.json({ Courses: user.purchasedCourses});
});

module.exports = router