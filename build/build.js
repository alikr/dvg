/*
 * @author alikr
 */
const fs = require('fs');
const path = require("path");
const uglify = require('uglify-js');
const rollup = require('rollup');
const config = require('./rollup.config.js');
const zlib = require('zlib');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}
const input = {
    input: config.input,
    plugins: config.plugins
}
rollup.rollup(input)
    .then(bundle => bundle.generate(config.output))
    .then(({ code }) => {
        let banner = config.output.banner ? config.output.banner + '\n' : '';
        var minifiedCode = banner + uglify.minify(code).code;
        var filename = config.output.file.replace(/\.js/,'.min.js');
        write(config.output.file, code);
        write(filename, minifiedCode);
    })
    .catch(err => {
        console.log(err)
    });

function write (dest, code) {
    return new Promise((resolve, reject) => {
    fs.writeFile(dest, code, err => {
        if (err) return reject(err);
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err);
        })
    })
    })
}