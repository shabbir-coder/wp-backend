// routes/index.js
const express = require('express');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes')
const cmsRoutes = require('./cms.routes');
const instanceRoutes = require('./instance.routes');
const chatsRoutes = require('./chat.routes')

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/sets', cmsRoutes);
router.use('/instance', instanceRoutes);
router.use('/chats', chatsRoutes);


module.exports = router;
