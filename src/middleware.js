import React from 'react'
import { renderToString } from 'react-dom/server'
import routes from './routes'
import { match, useRouterHistory } from 'react-router'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { createMemoryHistory } from 'history'

export default (req, res) => {
	// External routes
	if (['/auth/github', '/auth/github/callback'].indexOf(req.url) === 0) {
		return;
	}

	// Internal routes
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			if (process.env.NODE_ENV == 'development') {
				res.status(200).send(`
					<!doctype html>
					<html>
						<header>
							<title>My Universal App</title>
						</header>
						<body>
							<div id='root'></div>
							<script src='bundle.js'></script>
						</body>
					</html>
				`)
			} else if (process.env.NODE_ENV == 'production') {
				const store = configureStore()
				//const history = createHistory()
				const history = useRouterHistory(createMemoryHistory)({})

				res.status(200).send(`
					<!doctype html>
					<html>
						<header>
							<title>My Universal App</title>
							<link rel='stylesheet' href='bundle.css'>
						</header>
						<body>
							<div id='root'>${renderToString(<Root store={store} history={history} />)}</div>
							<script src='bundle.js'></script>
						</body>
					</html>
				`)
			}
		} else {
			res.status(404).send('Not found')
		}
	})
}
