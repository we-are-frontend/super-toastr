var path = require('path');
 var webpack = require('webpack');
 module.exports = {
     entry: {
         vendor: '@babel/polyfill', 
         'super-toastr': './super-toastr.js'
     },
     output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        libraryTarget: 'umd',
        library: 'SuperToastrLib'
     },
     module: {
        rules: [
             {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ["@babel/preset-env"]  //Preset used for env setup
                    }
                }
             }
         ]
     },
     devServer: {
        writeToDisk: true,
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };