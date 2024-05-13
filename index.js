const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const taskController = require('./src/controller/taskController');
const userController = require('./src/controller/userController');
const notificationController = require('./src/controller/notificationController');

const app = express();

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
  })
);

// app.use('/api', routes);

app.use('/', taskController);
app.use('/', userController);
app.use('/', notificationController);

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
