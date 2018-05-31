import path from 'path'
import address from 'address'
import chalk from 'chalk'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import webpack from 'webpack' // eslint-disable-line import/no-extraneous-dependencies
import webpackDevMiddleware from 'webpack-dev-middleware' // eslint-disable-line import/no-extraneous-dependencies
import webpackHotMiddleware from 'webpack-hot-middleware' // eslint-disable-line import/no-extraneous-dependencies

import webpackConfig from '../../webpack.config'

const app = express()

let compiler;

// Run Webpack dev server in development mode
if (process.env.NODE_ENV !== 'production') {
  compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/', // webpackConfig.output.publicPath, // 'http://192.168.1.129:3000/dist/',
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      modules: false,
    },
  }))
  app.use(webpackHotMiddleware(compiler))
}

// Apply body Parser and server public assets and routes
app.use(compression())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'build')))
  app.use(express.static(path.join(process.cwd(), 'public')))
}

app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}))

if (process.env.NODE_ENV !== 'production') {
  // https://github.com/jantimon/html-webpack-plugin/issues/145#issuecomment-170554832
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')

    compiler.outputFileSystem.readFile(filename, function(err, result) {
      if (err) {
        return next(err)
      }

      res.set('content-type','text/html')
      res.send(result)
      res.end()
    })
  })
}

if (process.env.NODE_ENV === 'production') {
  app.use('*', function (req, res, next) {
    res.sendFile(path.join(process.cwd(), 'build', 'index.html'))
  })
}

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server started: http://localhost:${process.env.NODE_PORT}`) // eslint-disable-line no-console

  // TODO: use react-dev-utils/WebpackDevServerUtils
  console.log([ // eslint-disable-line no-console
    `Localhost: ${chalk.magenta.bold(`http://localhost:${process.env.NODE_PORT}`)}`,
    `      LAN: ${chalk.magenta.bold(`http://${address.ip()}:${process.env.NODE_PORT}`)}`,
  ].join('\n'))
})
