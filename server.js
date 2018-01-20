const express = require('express');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const db = require("./models");
=======

>>>>>>> 66df61e09f62bcbe3d735e76f0a6b4f9dd3a85c5
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
    res.render('index');
});

<<<<<<< HEAD
db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
	    console.log("Server started on " + PORT);
	});
=======
app.listen(PORT, function() {
    console.log("Server started on " + PORT);
>>>>>>> 66df61e09f62bcbe3d735e76f0a6b4f9dd3a85c5
});