const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const ENV = process.env.NODE_ENV || 'production';
const IS_DEV = ENV === 'development';

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		`webpack/hot/dev-server`,
		path.resolve(__dirname, 'src')
	],
	devtool: IS_DEV ? 'cheap-module-eval-source-map' : 'source-map',
	output: {
		path: path.resolve(__dirname, 'src'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				WEBPACK: true
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: [ 'react-hmre' ]
				}
			},
			{
				test: /\.scss/,
				loader: 'style!css!sass!postcss',
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
				loaders: [
					'style?sourceMap',
					'css'
				]
			}
		]
	},
    postcss: function() {
        return [autoprefixer];
    },
	resolve: {
		alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
		}
	}
};
