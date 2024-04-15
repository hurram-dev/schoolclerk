const express = require('express');
const router = express.Router();
const classController = require('../controllers/Class.controller');

router.post('/', classController.createClass);
router.get('/teachers', classController.getAllTeachers);
router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.patch('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;
