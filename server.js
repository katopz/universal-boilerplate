/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import middleware from './src/middleware'

const app = express()

if (process.env.NODE_ENV === 'development') {
	const config = require('./webpack.config.dev')
	const compiler = webpack(config)
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
		stats: {
			assets: false,
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false
		}
	}))
	app.use(require('webpack-hot-middleware')(compiler))
	app.use(express.static(path.resolve(__dirname, 'src')))
} else if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, 'dist')))
}

// Mark:-- Passport
const passport = require('passport')
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from './server.config'
const GitHubStrategy = require('passport-github').Strategy

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
}, (accessToken, refreshToken, profile, cb) => {
	console.log(' ^ accessToken :', accessToken);
	return cb(null, profile);
}));

passport.serializeUser( (user, cb) => {
	cb(null, user);
});

passport.deserializeUser( (obj, cb) => {
	cb(null, obj);
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
	(req, res) => {
		// Successful authentication, redirect home.
		console.log(' ^ req :', req.user.username);
		res.redirect('/' + req.user.username);
	});

/*
app.get('/profile',
	require('connect-ensure-login').ensureLoggedIn(),
	(req, res) => {
		res.render('profile', { user: req.user });
	});
*/

// Mark:-- Start

app.get('*', middleware)

app.listen(3000, '0.0.0.0', (err) => {
	if (err) {
		console.error(err)
	} else {
		console.info('Listening at http://localhost:3000')
	}
})
