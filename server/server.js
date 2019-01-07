const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./user-router');
const cookieParser = require('cookie-parser');
const path = require('path');

mongoose.connect(
    'mongodb://admin:admin1989@ds145868.mlab.com:45868/leader',
    { useNewUrlParser: true },
);

const app = express();

app.set('port', (process.env.PORT || 5500));

app.use(express.static(path.join(__dirname, '../client')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/score', usersRouter);
app.use((req, res) => {
    res.status(500).send('Smth went wrong');
});

app.listen(app.get('port'), () => {
    console.log('Node app is running at localhost:' + app.get('port'));
});
