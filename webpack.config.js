const webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  devServer: {
    inline: true,
    port: 7777,
    contentBase: __dirname + '/public/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    /*
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    */
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.(jsx|js)$/,
      loader: 'babel',
      exclude: /(node_modules|bower_components)/
    },{
      test: /\.scss$/,
      loader: 'style!css!sass?sourceMap'
    }]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
};

