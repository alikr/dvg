const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const vue = require('rollup-plugin-vue');
const commonjs = require('rollup-plugin-commonjs');
const version = require('../package.json').version;
const banner =
  '/*!\n' +
  ' * Vag.js v' + version + '\n' +
  ' * (c) 2017-' + new Date().getFullYear() + ' alikr\n' +
  ' * Released under the MIT License.\n' +
  ' */'
module.exports = {
	version: version,
	input: 'src/index.js',
	plugins: [
		vue(),
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: true,
			babelrc: false,
			presets: ["es2015-rollup"],
			plugins: ["transform-runtime"],
		}),
		resolve(),
		commonjs(),
	],
	output: {
		name:'dvg',
		banner: banner,
		format: 'cjs',//cjs,amd,es,iife,umd
		file: 'dist/dvg.js'
	},
}
