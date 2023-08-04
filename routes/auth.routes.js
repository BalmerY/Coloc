const router = require('express').Router();
const { signinForm, signin, signout, googleAuth, googleAuthCb} = require('../controllers/auth.controller');
const passport = require('passport');



router.get('/signin/form', signinForm);
router.post('/signin',signin);
router.get('/signout',signout);

router.get('/google', googleAuth);
router.get('/google/cb',googleAuthCb);

module.exports = router;