'use strict'

require('dafisha-env')()

if (process.env.NODE_ENV === 'production') {
  require('./lib/server')
} else {
  // Use require.resolve https://github.com/babel/babel/issues/3969
  require('babel-register')({
    cache: true,
    presets: [
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-3'),
    ],
    plugins: [
      require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
    ],
  })

  require('./src/server')
}
