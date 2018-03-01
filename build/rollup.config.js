import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
module.exports={
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
		name:'vag',
		format: 'cjs',//cjs,amd,es,iife,umd
		file: 'dist/vag.js'
	}
}; 
