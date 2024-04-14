require('dotenv').config();
require('./src/database/mongo.database')

const express = require('express');
const userRouter = require("./src/routes/User.router")
const authRouter = require('./src/routes/Auth.router')
const authenticateUser = require('./src/middlewares/authentication')
const cors = require('cors');

const port = process.env.PORT || 8080;
var corsOptions = {
  origin: 'http://localhost:3000'
};

const app = express();


app.use(express.json());
app.use(cors(corsOptions));

app.get('/', authenticateUser, (req, res) => {
  res.send('You are authenticated');
});

app.use('/users', userRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
