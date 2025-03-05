const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');

// Get all enrollments
router.get('/', async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('studentId').populate('courseId');
        const students = await Student.find();
        const courses = await Course.find();
        res.render('enrollments', { enrollments, students, courses });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// Add a new enrollment
router.post('/add', async (req, res) => {
    try {
        await Enrollment.create(req.body);
        res.redirect('/enrollments');
    } catch (err) {
        res.status(400).send('Failed to enroll student');
    }
});

// 🔄 Add a new course
router.post('/add-course', async (req, res) => {
    try {
        const { name, description } = req.body;
        await Course.create({ name, description });
        res.redirect('/enrollments');
    } catch (err) {
        res.status(400).send('Failed to add course');
    }
});

module.exports = router;
