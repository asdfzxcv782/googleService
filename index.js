const passport = require("passport");
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session');
const Login = require('./routes/login.js');
const main = require('./routes/main.js');
const Logout = require('./routes/logout.js')
const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret : 'secret', // 對session id 相關的cookie 進行簽名
  resave : true,
  saveUninitialized: false, // 是否儲存未初始化的會話
  cookie : {
  maxAge : 1000 * 60, // 設定 session 的有效時間，單位毫秒
  },
}));

function ensureAuthenticated(req, res, next) {
  // 若使用者已通過驗證，則觸發 next()
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) { return next() }
  // 若使用者尚未通過驗證，則將使用者導向登入頁面
  res.redirect('/login')
}

app.use(passport.initialize())
app.use(passport.session())

app.use(function(err, req, res, next) {  //error handle must after passport middleware
  if (err) {
      req.logout();
      if (req.originalUrl == "/login") {
          next(); // never redirect login page to itself
      } else {
          res.redirect("/login/error");
      }
  } else {
      next();
  }
});

require('./lib/passport')(passport)

app.set('view engine', 'ejs');

app.use('/login', Login);
app.use('/logout',ensureAuthenticated,Logout)
app.use('/',ensureAuthenticated,main)

const port = process.env.port || 8000
app.listen(port, () => console.log(`Server running at ${port}`));