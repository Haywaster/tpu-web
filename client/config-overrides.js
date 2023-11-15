const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
	addWebpackAlias({
		'@': path.resolve(__dirname, 'src'),
		'@components': path.resolve(__dirname, 'src/components'),
		'@types': path.resolve(__dirname, 'src/@types'),
		'@pages': path.resolve(__dirname, 'src/pages'),
		'@services': path.resolve(__dirname, 'src/services'),
		'@utils': path.resolve(__dirname, 'src/utils'),
		'@assets': path.resolve(__dirname, 'src/assets'),
		'@redux': path.resolve(__dirname, 'src/redux'),
	})
);