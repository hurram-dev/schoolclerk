const Class = require('../models/Class.schema');
const User = require("../models/User.schema")
const StudentController = require("../controllers/Student.controller")

// Create a new class
exports.createClass = async (req, res) => {
    try {
        const studentsList = await StudentController.createStudents(req.body.students)

        if(studentsList.length) {
            const newClassPayload = {
                ...req.body,
                students: studentsList.map((student) => student?.id),
            }

            const newClass = await Class.create(newClassPayload);
            return res.status(201).send({ ok: true, newClass});
        }

        return res.status(400).send({
            ok: false,
            message: 'Cannot create class with empty students list'
        })
       
    } catch (error) {
        res.status(400).send({ok: false, error});
    }
};

// Get teachers
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({
            role: 'teacher'
        })
        res.status(200).send({
            teachers
        })
    } catch (error) {
        res.status(500).send('Error while getting teachers')
    }
}

// Get all classes
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('students mentor');
        res.status(200).send(classes);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single class by ID
exports.getClassById = async (req, res) => {
    try {
        const classData = await Class.findById(req.params.id).populate('students mentor');
        if (!classData) {
            return res.status(404).send();
        }
        res.send(classData);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a class
exports.updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedClass);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a class
exports.deleteClass = async (req, res) => {
    try {
        await Class.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};
