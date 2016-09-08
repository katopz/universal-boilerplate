const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				WEBPACK: true
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true,
				warnings: false,
				sequences: true,
				dead_code: true,
				conditionals: true,
				booleans: true,
				unused: true,
				if_return: true,
				join_vars: true,
				drop_console: true
			},
			comments: false,
			sourceMap: true
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'src', 'assets'),
				to: path.resolve(__dirname, 'dist', 'assets')
			}
		]),
		new ExtractTextPlugin('bundle.css')
	],
	module: {
		loaders: [
			{ 
				test: /\.js$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract('style', 'css!sass!postcss'),
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
    }/*,
	resolve: {
		alias: {
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	}*/,
	resolve: {
		alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
		}
	}
};
