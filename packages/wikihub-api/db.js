/* eslint-disable */
'use strict';

require('./dotenv').config()

if (process.env.NODE_ENV === 'production') {
  // TODO: сборка для проды
  // process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
  // process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));
  // In production, serve the webpacked server file.
  // require('./dist/server.bundle.js');
  require('./lib/server/db')
} else {
  require('babel-register')({
    cache: true,
    presets: [
      'react',
      'stage-3',
    ],
    plugins: ['transform-es2015-modules-commonjs'],
  })

  require('./src/server/db')
}
