const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/User');


// POST: signup
authRoutes.post('/signup', (req, res) => {
	const name = req.body.name;
	const lastName = req.body.lastName;
	const email = req.body.email
	const password = req.body.password;

	if (!name || !lastName || !email || !password) {
		res.status(400).json({ message: 'Please, complete all the fields with your data.' });
		return;
	}

	if (password.length < 5) {
		res
			.status(400)
			.json({ message: 'Please make your password at least 6 characters long for security purposes.' });
		return;
	}

	User.findOne({ email }, (err, foundUser) => {
		if (err) {
			res.status(500).json({ message: 'E-mail check went bad.' });
			return;
		}

		if (foundUser) {
			res.status(400).json({ message: 'This email already exists. Please, log in.' });
			return;
		}

		const salt = bcrypt.genSaltSync(10);
		const hashPass = bcrypt.hashSync(password, salt);

		const aNewUser = new User({
			name: name,
			lastName: lastName,
			email: email,
      password: hashPass
		});

		aNewUser.save((err) => {
			if (err) {
				res.status(400).json({ message: 'Saving user to database went wrong.' });
				return;
			}

			// Automatically log in user after sign up
			// .login() here is actually predefined passport method
			req.login(aNewUser, (err) => {
				if (err) {
					res.status(500).json({ message: 'Login after signup went bad.' });
					return;
				}

				// Send the user's information to the frontend
				// We can use also: res.status(200).json(req.user);
				res.status(200).json(aNewUser);
			});
		});
	});
});


// POST: login
authRoutes.post('/login', passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))


//POST: logout
authRoutes.post('/logout', (req, res) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});


//GET: loggedin
authRoutes.get('/loggedin', (req, res) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.json({ });
});

module.exports = authRoutes;