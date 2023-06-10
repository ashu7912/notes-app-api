const express = require('express');
const router = new express.Router();
const controller = require('../controllers/notecontroller');


const authMiddleware = require('../middleware/auth');


router.post('/', authMiddleware, controller.addNote);
router.get('/', authMiddleware, controller.getNotes);
router.post('/assign/:id', authMiddleware, controller.assignNote);
router.post('/update/:id', authMiddleware, controller.updateNote);
router.delete('/delete/:id', authMiddleware, controller.deleteNote);

module.exports = router;