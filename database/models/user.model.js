const mongoose = require('mongoose');
const bcryt = require('bcrypt');
const schema = mongoose.Schema;
const { findUserPerEmail } = require('../../queries/user.queries');
const { debug } = require('../../config/util.config');


   

const userSchema = schema({
    local:  {
        email : {   type: String, 
                    required : [true,'email requis'], 
                    unique: [true,'email deja utilisé']
                },
        password :{ type: String },
        googleId: { type: String}
            },
    name :  { type: String,
            unique :[true, 'Nom requis'] 
            },
    avatar: { type: String, default:'/images/avatar/default-profile.svg'}
});


userSchema.statics.hashPassword = async (password) => {
    try {
        const salt = await bcryt.genSalt(10);
        return bcryt.hash( password, salt );
    } catch (e) {
        throw e;
    }  
};

userSchema.methods.comparePassword = function(password){
return bcryt.compare(password, this.local.password);
};

const User = mongoose.model('user',userSchema);
module.exports = User;