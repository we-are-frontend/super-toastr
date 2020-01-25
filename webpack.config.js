var path = require('path');
 var webpack = require('webpack');
 module.exports = {
     entry: ['./super-toastr.js'],
     output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'super-toastr.bundle.js',
        libraryTarget: 'var',
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
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };