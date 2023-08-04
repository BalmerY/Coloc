const router = require('express').Router();
const flatsRoutes = require('./flats.routes');
const usersRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');
const { ensureAuthenticated } = require('../config/security.config');


router.use('/flats', ensureAuthenticated, flatsRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.get('/', (req, res)=> { res.render('home',{ isAuthenticated: req.isAuthenticated(), currentUser: req.user })});
//router.get('/', (req, res)=> { res.redirect('/flats'); });
router.get('/super', (req, res)=> {res.render('super',{ isAuthenticated: req.isAuthenticated(), currentUser: req.user })});
router.get('/echec', (req, res)=> {res.render('echec',{ isAuthenticated: req.isAuthenticated(), currentUser: req.user })});


module.exports = router;

