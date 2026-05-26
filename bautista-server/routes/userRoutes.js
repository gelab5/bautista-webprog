const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, createUser, updateUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.post('/', createUser);        // ✅ Add user from dashboard
router.put('/:id', updateUser);      // ✅ Edit / toggle status

module.exports = router;