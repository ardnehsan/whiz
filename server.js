const express = require('express');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const NodeGeocoder = require('node-geocoder');

// Set port
const PORT = process.env.PORT || 3000

//Init app
const app = express();

// View engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// method-override
app.use(methodOverride('_method'));

// Search Store Page
app.get('/', (req, res, next) => {
    res.render('search');
});

// Add Store Page
app.get('/addstore', (req, res, next) => {
    res.render('add');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});