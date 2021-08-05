const express = require('express')
const session = require('express-session')
const KnexStore = require('connect-session-knex')(session)
const db = require('./db/db')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const PORT = process.env.PORT || 8080
const sessionStore = new KnexStore({knex: db})
const app = express()
const bcrypt = require('bcrypt')
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = app

if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my best friend is Marley',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.post('/signup', async (req, res, next) => {
  // console.log(req)
  try {
    const {email, password} = req.query
    const hash = await bcrypt.hashSync(password, 10)
    const [user] = await db('user').insert({firstName:'wwww',lastName:'hhh', email, password: hash, googleId: 'fff'}).returning('*')
    req.session.user = user
    res.json(user)
  } catch (err) {
    console.log('err: ', err)
    if (err) {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})
app.post('/login', async (req, res, next) => {
  try {
    const {email, password} = req.query
    const user = await db('user').first('*').where({email})
    if (!user) {
      console.log('No such user found:', req.query.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      const validPass = await bcrypt.compare(password, user.password)
      if (validPass) {
        req.session.user = user
        res.json(user)
      } else {
        console.log('Incorrect password for user:', email)
        res.status(401).send('Wrong username and/or password')
      }
    }
  } catch (err) {
    next(err)
  }
})








app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))