const express = require('express')
const sequelize = require('./config/connection')
require("dotenv").config()
const path = require('path')
const routes = require('./controllers')
const exphbs = require('express-handlebars')
const helpers = require('./utils/helpers');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'super duper secret',
  cookie: {
    maxAge: 7200000, // 2 hours
    //maxAge: 300000, // 5 mins
    sameSite: false,
    secure: false,
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
}

app.use(session(sess))

const hbs = exphbs.create({ helpers })
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`TechHub is listening on port ${PORT}`));
  });