module.exports = {
	root: true,
	parser: 'babel-eslint',
	env: {
		browser: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-empty-interface': [
			'error',
			{
				allowSingleExtends: true,
			},
		],
		'@typescript-eslint/explicit-member-accessibility': 'error',
		'@typescript-eslint/explicit-function-return-type': 'error',
		indent: ['off'],
		'no-mixed-spaces-and-tabs': 0,
		quotes: ['off'],
		semi: ['error', 'always'],
	},
};
