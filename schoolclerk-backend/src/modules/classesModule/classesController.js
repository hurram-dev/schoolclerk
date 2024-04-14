const Class = require('./classesSchema');

exports.createClass = async (req, res) => {
    try {
        let newClass = new Class(req.body);
        await newClass.save();
        res.status(201).send(newClass);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllClasses = async (req, res) => {
    try {
        let classes = await Class.find({});
        res.status(200).send(classes);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getClassById = async (req, res) => {
    try {
        let classData = await Class.findById(req.params.id);
        if (!classData) {
            return res.status(404).send();
        }
        res.status(200).send(classData);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateClass = async (req, res) => {
    try {
        let classData = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!classData) {
            return res.status(404).send();
        }
        res.status(200).send(classData);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteClass = async (req, res) => {
    try {
        let classData = await Class.findByIdAndDelete(req.params.id);
        if (!classData) {
            return res.status(404).send();
        }
        res.status(200).send(classData);
    } catch (error) {
        res.status(500).send(error);
    }
};
