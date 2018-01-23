const express = require('express');
const router = express.Router();

// Search Store Page
router.get('/', ensureAuthenticated, function (req, res, next) {
	res.render('index');
});

router.get('/login', ensureAuthenticated, function (request, res, next) {
	res.render('login');
});

router.get('/register', function (request, res) {
	res.render('register');
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;