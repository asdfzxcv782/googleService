const passport = require("passport");
const bodyParser = require('body-parser')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const express = require('express')
const session = require('express-session');
const OAuth2Data = require('./config/oauth.json');
const FirestoreHnadle = require("./lib/firestore.js");
const app = express()

const square = new FirestoreHnadle()
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

app.set('view engine', 'ejs');

passport.serializeUser(function(user, done) {
  // 只將用戶 id 序列化存到 session 中
  console.log("serializeUser: " + user.id)
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  // 透過使用者 id 到 MongoDB 資料庫尋找用戶完整資訊
  console.log("deserializeUser ID: " + id)
  let result = await square.get("googleUsers",id)
  
  done(null,result)
  
})

passport.use(
    new GoogleStrategy(
      {
        clientID: OAuth2Data.web.client_id,
        clientSecret: OAuth2Data.web.client_secret,
        callbackURL: OAuth2Data.web.redirect_uris[0]
      },
      async function(accessToken, refreshToken, profile, done) {
        userProfile=profile;
        console.log("accessToken: " + accessToken)
        console.log("refreshToken: " + refreshToken)
        console.log(userProfile)
        await square.set("googleUsers",userProfile.id, userProfile._json,true)
        return done(null, userProfile);
      }
      /*accessToken => {
        console.log("access token: ", accessToken);
      }*/
    )
);

app.get("/", ensureAuthenticated,function(req,res){
  console.log(req.user)
  res.send(req.user);
})

app.get('/logout', async function(req, res) {
  console.log("logged out!");
  await req.logOut();
  //req.session.destroy()
  //res.clearCookie("connect.sid")
  res.redirect('/login');
});

app.get("/error",(req,res) =>{
  res.render("login")
})
//app.get("/auth/google/redirect",passport.authenticate('google'));

app.get("/login",(req,res) =>{
  res.render("login")
})

app.get("/login/googleAuth", passport.authenticate("google", {
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
}));

app.get("/auth/google/callback",
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
      res.redirect('/');
    }
    //res.send("you reached the redirect URI");
);

const port = process.env.port || 8000
app.listen(port, () => console.log(`Server running at ${port}`));