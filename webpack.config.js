const path = require('path');

const input = path.join(__dirname + '/client/src');
const output = path.join(__dirname + '/client/dist')

// webpack go brrrrr

module.exports = {
  entry: {
    app: `${input}/app.jsx`
  },
  output: {
    path: output,
    filename: 'bundle.js'
  },
  module:{
    rules: [
      {
         test: /\.jsx?/,
         use: {
           loader: 'babel-loader'
         },
         exclude: /nodemodules/
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
   ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      'util': false,
      'buffer': false,
      'timers': false,
      'stream': false,
      'crypto': false,
      'url': false
    }
  },
  externals: {
    'fs': "require('fs')",
    'path': "require('path')",
    'tls': "require('tls')",
    'net': "require('net')"
  }
}