const Student = require('../models/Student.schema');

// Bulk create students
exports.createStudents = async (students = []) => {
    try {
        const createdStudents = await Student.insertMany(students);
        return createdStudents;
    } catch (error) {
        return new Error(`Error while creating student. Reason: ${error}`);
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('parent');
        res.status(200).send(students);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('parent');
        if (!student) {
            return res.status(404).send();
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a student
exports.updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedStudent);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};
