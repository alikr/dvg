const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path');
const style_loader = [
	{
		loader: 'style-loader',
		options: {
			singleton: true,
			sourceMap: true
		}
	}
];
module.exports = function(prod){
	style_loader[0].options.sourceMap = !prod;
	if (prod) {
		delete style_loader[0].options.singleton;
	}
	var cssOptions = cssLoaders(prod);
	return {
		css:cssLoader(prod, cssOptions),
		less:lessLoader(prod, cssOptions),
		vue:vueLoader(prod, cssOptions),
	}
}
function cssLoaders(prod){
	return [
		{
			loader:'css-loader',
			options:{
	      minimize: prod ? true : false,
	      sourceMap: prod ? false : true
	    }
		},
		{
      loader: 'postcss-loader',
      options: {
        sourceMap: prod ? false : true,
        config: {
        	path: path.join(__dirname, './postcss.config.js')
        }
      }
    }
	];
}

function cssLoader(prod, cssOptions){
	return prod ? ExtractTextPlugin.extract({
		fallback: 'style-loader',
	  use: cssOptions
	}) : style_loader.concat(cssOptions);
}

function vueLoader(prod, cssOptions){
	return prod ? ExtractTextPlugin.extract({
	    fallback: 'vue-style-loader',
	    use: cssOptions
	  }) : ['vue-style-loader'].concat(cssOptions)
}

function lessLoader(prod, cssOptions){
	var less = {
  	loader: "less-loader",
  	options: {
      sourceMap: prod ? false : true
    }
  }
	return prod ? ExtractTextPlugin.extract({
	    fallback: 'style-loader',
	    use: cssOptions.concat([less])
	  }) : style_loader.concat(cssOptions).concat([less])
}