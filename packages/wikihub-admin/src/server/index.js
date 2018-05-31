import path from 'path'
import address from 'address'
import chalk from 'chalk'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import {Strategy} from 'passport-local'
import {ensureLoggedIn} from 'connect-ensure-login'
import morgan from 'morgan'
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

app.use(morgan('tiny'))
app.use(compression())
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'build')))
  app.use(express.static(path.join(process.cwd(), 'public')))
}

app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}))

// ----------- auth --------------------------------
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  {usernameField: 'login'},
  function(username, password, cb) {
    console.log('username, password', username, password)
    if (username !== 'admin' || password !== 'dafisha5') {
      return cb(null, false)
    } else {
      return cb(null, {id: 1, login: 'admin'})
    }
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  console.log('user', user)
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  console.log('id', id)
  cb(null, {id: 1, login: 'admin'})
})

app.use(session({ secret: 'abc', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())



app.get('/login-error', (req, res) =>  {
  console.log(1)
  res.json({
    error: true,
    payload: {
      message: 'Неправильный логин или пароль'
    }
  })
})

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login-error', usernameField: 'login' }),
  (req, res) =>  {
    console.log(3)
    res.json({
      payload: {
        message: 'норм'
      }
    })
  }
)

app.get('/logout', (req, res) => {
  console.log(4)
  req.logout()
  res.redirect('/login')
})
// ----------- !auth -------------------------------

if (process.env.NODE_ENV !== 'production') {
  // https://github.com/jantimon/html-webpack-plugin/issues/145#issuecomment-170554832
  app.use('*', function (req, res, next) {
    console.log(5)
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
  app.use('*', ensureLoggedIn({redirectTo: '/login'}), (req, res) => {
    console.log('5')
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
