const mongoose = require('mongoose')
const schema = mongoose.Schema

const flatSchema = schema({ 
                        name : { 
                                type : String,
                                maxlength : [140, 'Nom trop long'],
                                minlength : [1, 'Nom trop court'],
                                required : [true, 'Nom requis'],
                                },
                        description : String,
                        size : Number, 
                        active : Boolean,
                        author: {
                                type: schema.Types.ObjectId,
                                ref: 'user',
                                required: true
                                }},
                        {timestamps : true});

const Flat = mongoose.model('flats', flatSchema);

module.exports = Flat