// routes/userRoutes.js
const express = require('express');
const chatsController = require('../controllers/chats.controller');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Get user by ID route
router.post('/saveContact', authenticateToken, chatsController.saveContact);


router.post('/updateContact/:id', authenticateToken, chatsController.updateContacts);

router.get('/getContacts', authenticateToken, chatsController.getContact);

router.post('/getMessages', authenticateToken, chatsController.getMessages);

router.post('/sendMessage', authenticateToken, chatsController.sendMessages);

router.post('/recieveMessage', chatsController.recieveMessages);

router.get('/getreport/:id', chatsController.getReport);

module.exports = router;
