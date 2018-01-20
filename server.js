const express = require('express');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const path = require('path');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const expressValidator = require('express-validator');
// const multer = require('multer');
// const bcrypt = require('bcryptjs');
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
app.use(express.static(path.join(__dirname, 'public')));

// method-override
// app.use(methodOverride('_method'));

// Handle Sessions
// app.use(session({
//     secret: 'secret',
//     saveUninitialized: true,
//     resave: true
// }));

// Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Validator
// app.use(expressValidator({
//     errorFormatter: function (param, msg, value) {
//         var namespace = param.split('.'),
//             root = namespace.shift(),
//             formParam = root;

//         while (namespace.length) {
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return {
//             param: formParam,
//             msg: msg,
//             value: value
//         };
//     }
// }));

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(flash());
// app.use(function (req, res, next) {
//     res.locals.messages = require('express-messages')(req, res);
//     next();
// });

// app.get('*', function (req, res, next) {
//     res.locals.user = req.user || null;
//     next();
// });

// Search Store Page
// app.get('/', (req, res, next) => {
//     res.render('index');
// });

//Michael added this in
var routes = require("./controllers/controller.js");

app.use("/", routes);
//this is the end of what I added in...


db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server started on " + PORT);
    });
});