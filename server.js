const express = require('express');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const db = require("./models");

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
app.use(express.static(path.join(__dirname, './public')));

//cors
app.use(cors());

//secret
app.use(session({
    secret: process.env.SESSIONSECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true
}));

//middleware for setting up a user object when anyone first come to the appplication
function userSetup(req, res, next) {
    if (!req.session.user) {
        req.session.user = {}
        req.session.user.loggedIn = false;
    }
    next()
}
app.use(userSetup)



require('./routes/userApiRoutes.js')(app)
const routes = require('./controllers/controller.js')

app.use("/", routes);


db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server started on " + PORT);
    });
});