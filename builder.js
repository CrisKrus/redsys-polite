/*jshint esversion:6*/
import webpack from 'webpack';
import Mocha from 'mocha';

const webpackConfig = {
    entry: './src/index.js',
    output: {
        path: './lib',
        filename: 'redsys-polite.js',
        target: "node", // in order to ignore built-in modules like path, fs, etc.
        libraryTarget: "commonjs2"
    },
    target: "node", // in order to ignore built-in modules like path, fs, etc.
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        alias: {
            'redsys': './src/redsys'
        }
    }
};

// returns a Compiler instance
var compiler = webpack(webpackConfig);
compiler.watch({
    aggregateTimeout: 500,
    poll: true
},function(err, stats) {
    if (err) { throw new gutil.PluginError('webpack:build', err); }

    console.log('[webpack:build]', stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true
    }));
});
