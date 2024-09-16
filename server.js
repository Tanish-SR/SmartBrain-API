const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config(); // Load environment variables from .env file

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const PORT = 3000;
const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'tanish2407',
      database: 'smart-brain',
    },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('success');
});

// app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/signin', (req, res) => {
    console.log('Sign-in request received:', req.body);
    signin.handleSignin(db, bcrypt)(req, res);
});

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfileChange(req, res, db));
app.put('/image', (req, res) => image.handleImageChange(req, res, db));

// New route for handling API call to Clarifai
app.post('/imageurl', (req, res) => image.handleApiCall(req, res)); 

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
