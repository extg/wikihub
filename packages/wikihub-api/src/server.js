import address from 'address'
import chalk from 'chalk'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'

import router from './router'
import makeGoogleApiMiddleware from './middlewares/googleApiMiddleware'

const app = express()

// Apply body Parser and server public assets and routes
app.use(compression())

app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}))

app.use(makeGoogleApiMiddleware())

app.use(function(req, res, next) {
  const allowedOrigins = [
    process.env.PUBLIC_MAIN_URL,
    process.env.PUBLIC_ADMIN_URL,
  ]
  const origin = req.headers.origin

  if(allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }


  return next()
})

// https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// Add headers
app.use(function (req, res, next) {
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.use(router)

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server started: http://localhost:${process.env.NODE_PORT}`) // eslint-disable-line no-console

  console.log([ // eslint-disable-line no-console
    `Localhost: ${chalk.magenta.bold(`http://localhost:${process.env.NODE_PORT}`)}`,
    `      LAN: ${chalk.magenta.bold(`http://${address.ip()}:${process.env.NODE_PORT}`)}`,
  ].join('\n'))
})
