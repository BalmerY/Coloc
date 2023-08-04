const User = require('../database/models/user.model');


exports.createUser =  async ( user ) => { 
    try {
        const hashedPassword = await User.hashPassword( user.password );
        const newUser = new User({  local : { 
                                        email : user.email, 
                                        password : hashedPassword },
                                    name : user.name });
        return newUser.save();   
    } catch(e) { 
        throw e;
    }
};

exports.findUserPerEmail = ( email ) => {
    return User.findOne({'local.email': email }).exec();
};

exports.findUserPerId = ( id ) => {
    return User.findById( id ).exec();
};

exports.findUserPerGoogleId = (googleId) => {
    return User.findOne({'local.googleId':googleId}).exec();
};
                               