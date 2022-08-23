const express = require('express')
const sequelize = require('./config/connection')
require("dotenv").config()
const path = require('path')
const routes = require('./controllers')
const exphbs = require('express-handlebars')
//const sessions = require('express-session')
//const SequelizeStore 

const app = express()
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`TechHub is listening on port ${PORT}`));
  });