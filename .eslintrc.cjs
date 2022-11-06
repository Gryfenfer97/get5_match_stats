module.exports = {
	parser: '@typescript-eslint/parser',
	/** @type { import("@typescript-eslint/parser").ParserOptions } */
	parserOptions: {
		project: './tsconfig.json',
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		},
		babelOptions: {
			presets: [
				'@babel/preset-react'
			]
		}
	},
	plugins: [
		'@typescript-eslint',
		'deprecation'
	],
	env: {
		browser: true,
		node: true,
		es6: true
	},
	rules: {
		'@typescript-eslint/no-var-requires': [
			'off'
		],
		'no-console': 'error',
		'react/prop-types': 0,
		'comma-dangle': [
			'error',
			'never'
		],
		'@typescript-eslint/no-floating-promises': [
			'error'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'no-trailing-spaces': 'error',
		'deprecation/deprecation': 'error'
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:@typescript-eslint/recommended'
	],
	root: true,
	settings: {
		react: {
			pragma: 'h',
			version: '16.0'
		}
	}
}
