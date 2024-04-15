const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }],
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    permanentRoom: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
