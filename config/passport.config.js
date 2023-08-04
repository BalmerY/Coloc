const passport = require('passport');
const { app } = require('../app');
const User = require('../database/models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findUserPerEmail, findUserPerId, findUserPerGoogleId } = require('../queries/user.queries');



app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user , done) => {done(null , user._id)});

passport.deserializeUser( async ( id , done ) => {
    try {
        const user = await findUserPerId( id );
        done( null , user );
        } 
    catch (e) {
        done(e, null);
    }
});

passport.use('local', new LocalStrategy( { usernameField: 'email' }, async ( email, password, done) => {
    try {
        const user = await findUserPerEmail(email)
        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                done(null, user);
            } else {
                done(null, false, { message: "Mot de passe erronée" });
            }   
        } else {
            done( null , false, { message: "Pas d' utilisateur à ce nom" });  
        }
        } 
    catch (e) {
        done(e);
    }
}));

passport.use('google', new GoogleStrategy(
    {
    clientID:'936438242186-6t6ffck2peoisfvu53h7m4aev7gpq5bu.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'/auth/google/cb'},
    async (accesToken, refreshToken, profile, done) => { 
        try {
            const user = await findUserPerGoogleId(profile.id);
            if (user) {
                done(null, user); 
            } else {
                const newUser = new User({
                    local: {
                        email : profile.emails[0].value,
                        googleId: profile.id
                          },
                    name : profile.displayName
                })
                const savedUser = await newUser.save();
                done(null, savedUser);
            }
        } catch (error) {
            done(error);
        }
    }
    
    ));
