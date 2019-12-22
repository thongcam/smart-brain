const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const pg = require('pg');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const saltRounds = 10;


const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => { res.send('its working') } );

app.post('/signin', signin.handleSignin(knex,bcrypt));

app.post('/register', register.handleRegister(knex,bcrypt));

app.get('/profile/:id', profile.handleProfileGet(knex));

app.put('/image', image.handleImage(knex));

app.post('/imageURL', image.handleAPICall);

app.listen(process.env.PORT||3000,() => {
  console.log(`App is running on port ${process.env.PORT}`);
})
