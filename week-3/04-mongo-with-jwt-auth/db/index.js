const mongoose = require('mongoose');

// either use mongoose.Schema in whole file or write  const { Schema } = mongoose
// Connect to MongoDB
mongoose.connect('mongodb+srv://vikash2024:Vikash2024@cluster0.dib0h.mongodb.net/course_selling_app2');
    
// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password : String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password : String,
    purchasedCourses : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title : String,
    description : String,
    imageLink : String,
    price : Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}