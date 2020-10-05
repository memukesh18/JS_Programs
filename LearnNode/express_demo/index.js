
const debug = require('debug')('app:startup');
const config = require('config');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');  //default

app.use(express.json());
app.use('/api/courses', courses);
app.use('/', home);

// Configuaration
console.log('Application Name : ' + config.get('name'));
console.log('Mail Server : ' + config.get('mail.host'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

app.use(logger);

const port = process.env.PORT  || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));




