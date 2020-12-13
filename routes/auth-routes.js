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
		res
		.json({ message: 'Please, complete all the fields with your data.' })
		.status(400)
		return;
	}

	if (password.length < 5) {
		res
			.json({ message: 'Please make your password at least 6 characters long for security purposes.' })
			.status(400)
		return;
	}

	User.findOne({ email }, (err, foundUser) => {
		if (err) {
			res
			.json({ message: 'E-mail check went bad.' })
			.status(500)
			return;
		}

		if (foundUser) {
			res
			.json({ message: 'This email already exists. Please, log in.' })
			.status(400)
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


authRoutes.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, theUser, failureDetails) => {
			if (err) {
					res.status(500).json({ message: 'Something went wrong authenticating user' });
					return;
			}
			if (!theUser) {
					res.json(failureDetails).status(401);
					return;
			}
			req.login(theUser, (err) => {
					if (err) {
							res.status(500).json({ message: 'Session save went bad.' });
							return;
					}
					res.status(200).json(theUser);
			});
	})(req, res, next);
});


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