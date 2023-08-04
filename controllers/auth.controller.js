const User = require('../database/models/user.model');
const passport = require('passport');

exports.signinForm = (req, res, next) => {
   res.render('auth/auth-form', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
};

exports.signin = (req, res, next) => {
     passport.authenticate( 'local' , (err, user, info) => {
        if (err) {
            netx(err)
        } else if (!user) {
            res.render('auth/auth-form', { errors: [info.message] , isAuthenticated: req.isAuthenticated(), currentUser: req.user });
        } else {
            req.login(user, (err) => {
                if (err) {
                    next(err);
                } else {
                    res.redirect('/flats');
                }
                })
        }
     })(req, res, next);
};

exports.googleAuth = (req, res, next) => {
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })( req, res, next);
};

exports.googleAuthCb = (req, res, next) => {
    passport.authenticate('google',{successRedirect : '/flats', failureRedirect :'/auth/signin/form'})(req, res, next);
};

exports.signout= (req, res, next) => {
    req.logout( (err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/auth/signin/form');
        }
    })
    
};