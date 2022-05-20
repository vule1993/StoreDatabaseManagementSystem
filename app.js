//initial extends
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

//connect express
const app = express();
const PORT = process.env.PORT || 3000;

//Parsing middleware:
//Parse application/x-www-form-urlencoded -- can read more detail on npmjs.com
app.use(bodyParser.urlencoded({extended: false}));

//Parse appl/json
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//templating handlebars Engine (similar to ejs)
app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//create connection pool 
const pool = mysql.createPool({
    connectionLimit: 100,
    host           : process.env.DB_HOST,
    user           : process.env.DB_USER,
    password       : process.env.DB_PASSWORD,
    database       : process.env.DB_NAME,
});

//Connect to Database
pool.getConnection((err, connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID ' +connection.threadId);

});

//link to user route
const routes = require('./server/routes/index');


app.use('/', routes);



app.listen(PORT, () => console.log(`Listenning on PORT: ${PORT}`));






