const express = require('express');

const {
  register,
  login,
  logout,
} = require('../controllers/authController');

// initiate express router
const router = express.Router();

// set routes
router.route('/signup').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;
