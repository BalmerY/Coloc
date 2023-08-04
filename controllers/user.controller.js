const { createUser } = require('../queries/user.queries');
const {debug} = require('../config/util.config');
const path = require('path');
const multer = require('multer');
const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => { cb(null, path.join(__dirname,'../public/images/avatar'))},
    filename: (req, file, cb ) => { console.log(file.originalname); console.log(Date.now()); cb(null,`${Date.now()} - ${file.originalname}`)}
})})



exports.signup = async (req, res, next) => {
    
    try {
        const body = req.body;
        const user = await createUser(body);
        req.login( user,(err) => {  if( err ) 
                                    { next( err )}
                                    res.redirect('/');
                                });
        }
    catch(e) {
       // errors = Object.keys(err.errors).map( key => err.errors[key].message);
        res.status(400).render('users/user-form', { errors : [e.message], isAuthenticated: req.isAuthenticated(), currentUser: req.user } );
        }
    };

exports.signupForm = (req, res, next) => {
    res.render( 'users/user-form', { errors : null, isAuthenticated: req.isAuthenticated(), currentUser: req.user} );
};


exports.uploadImage = [
    upload.single('avatar'),
    async (req, res, next) => {
        try {
            const user = req.user
            user.avatar = `/images/avatar/${req.file.filename}`;
            await user.save();
            res.redirect('/');
        } catch (e) {
            next(e)
        }
    }
]