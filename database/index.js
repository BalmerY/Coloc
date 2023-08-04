const mongoose= require('mongoose')

mongoose.set('strictQuery', false);
exports.clientPromise = mongoose.connect('mongodb+srv://Yannick:motdepassemongodb@cluster0.5qdlx6o.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true,})
                                .then((m) => { console.log("connexion ok!");return m;})
                                .catch((err) => console.log(err));

                               