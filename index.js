const passport = require('passport')
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const Login = require('./routes/login.js')
const Admin = require('./routes/admin.js')
const main = require('./routes/main.js')
const Logout = require('./routes/logout.js')
const Monitor = require('./routes/monitor')
const cors = require('cors')
const envConfig = require('./config/envConfig.json')
const basicAuth = require('./lib/basicauth')
const app = express()

app.use(cors({ // get config by env
  origin: process.env.CorsOrigin,
  credentials: (process.env.CorsCredentials === 'true') // 傳過來的是string需要轉換
}))

// eslint-disable-next-line node/no-path-concat
app.use('/static', express.static(__dirname + '/views')) // 要在passport前面才不會請求deserializeUser多次
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
  secret: 'secret', // 對session id 相關的cookie 進行簽名
  resave: true,
  saveUninitialized: false, // 是否儲存未初始化的會話
  cookie: {
    maxAge: 1000 * 6000 // 設定 session 的有效時間，單位毫秒
  }
}))

function ensureAuthenticated (req, res, next) {
  // 若使用者已通過驗證，則觸發 next()
  console.log(req.originalUrl + ' ' + req.isAuthenticated())
  if (req.isAuthenticated()) { return next() }
  // 若使用者尚未通過驗證，則將使用者導向登入頁面
  // res.status(403).send('PermissionDined')
  if (req.originalUrl !== '/') {
    res.send({
      Syscode: 403,
      Message: 'NeedLogin'
    })
  } else {
    res.redirect('/login')
  }
}

function redirectUnmatched (req, res) {
  res.redirect('/login/error')
}

function AuthorityCheck (req, res, next) {
  if (req.user === undefined) {
    res.send({
      Syscode: 403,
      Message: 'NeedLogin'
    })
  } else if (req.user.Authority === 7) {
    return next()
  } else {
    res.send({
      Syscode: 403,
      Message: 'PermissionDined'
    })
  }
}

app.use(passport.initialize())
app.use(passport.session())

app.use(function (err, req, res, next) { // error handle must after passport middleware
  if (err) {
    req.logout()
    if (req.originalUrl === '/login') {
      next() // never redirect login page to itself
    } else {
      res.redirect('/login/error')
    }
  } else {
    next()
  }
})
require('./lib/passport')(passport)
app.use('/login', Login)
app.use('/logout', ensureAuthenticated, Logout)
app.use('/admin', AuthorityCheck, ensureAuthenticated, Admin)
app.use('/monitor', basicAuth, Monitor)
app.use('/', ensureAuthenticated, main)
app.use(redirectUnmatched) // handle unmatched api 一定要在use其他api的下面

console.log(process.env.NODE_ENV)
app.listen(process.env.PORT, () => console.log(`Server running at ${process.env.PORT}`))
