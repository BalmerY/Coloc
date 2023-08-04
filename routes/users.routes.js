const router = require('express').Router();
const { signup, signupForm, uploadImage } = require('../controllers/user.controller');
const { ensureAuthenticated } = require('../config/security.config');


router.get('/signup/form', signupForm);
router.post('/signup',signup);
router.post('/update/image', ensureAuthenticated, uploadImage)

module.exports = router;