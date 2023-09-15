const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
	addWebpackAlias({
		'@': path.resolve(__dirname, 'src'),
		'@components': path.resolve(__dirname, 'src/components'),
		'@types': path.resolve(__dirname, 'src/@types'),
		'@pages': path.resolve(__dirname, 'src/pages'),
		'@service': path.resolve(__dirname, 'src/service'),
		'@utils': path.resolve(__dirname, 'src/utils'),
	})
);