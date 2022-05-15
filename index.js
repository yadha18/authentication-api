const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/auth')
const postsRoutes = require('./routes/posts')

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT, 
    () => console.log('Connected!')
);

app.use(express.json());
app.use('/api/user', routes);
app.use('/api/posts', postsRoutes);

app.listen(3000, () => console.log('Server is Running!'));

