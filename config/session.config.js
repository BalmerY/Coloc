const session = require('express-session');
const MongoStore = require('connect-mongo');
const { clientPromise } = require('../database');
const { app } = require('../app');


app.use(session({
    secret:'@foodForLunch',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 14,
            },
    store: MongoStore.create({ clientPromise: clientPromise.then((m) => m.connection.getClient()),
                               ttl: 60 * 60 * 24 * 14,}),
            })
        );

