const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const newSession = (db) => session({
    store: new SequelizeStore({
        db,
        checkExpirationInterval: 15 * 60 * 1000, 
        expiration: 24 * 60 * 60 * 1000,
        table: 'Session',
        extendDefaultFields
    }),
    secret: 'hahahahuhuhuhehehehihihi',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        
    }
});

const extendDefaultFields = (defaults, session) => (
    {
      data: defaults.data,
      expires: defaults.expires,
      userId: session.userId
    }
);
  
module.exports = newSession;
