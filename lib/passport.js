const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const OAuth2Data = require('../config/oauth.json');
const refresh = require('passport-oauth2-refresh')
const Db = require("./firestore.js");

function googleAuth(){
    passport.serializeUser(function(user,done) {
        // 只將用戶 id 序列化存到 session 中
            console.log("serializeUser: " + user.id)
            done(null, user)
    })
  
    passport.deserializeUser(async function(info, done) {
        // 透過使用者 id 到 MongoDB 資料庫尋找用戶完整資訊
        console.log("deserializeUser ID: " + info.id)
        /*let result = await Db.collection("googleUsers").doc(info.id).get().catch(function (err) {
            done("test", null);
        });*/
        let result = await Db.collection("googleUsers").doc(info.id).get()
        done(null,result.data()) 
        
    })
  
    passport.use('google', //passport.authenticate('google'), use name of google passport
        new GoogleStrategy(
            {
                clientID: OAuth2Data.web.client_id,
                clientSecret: OAuth2Data.web.client_secret,
                callbackURL: OAuth2Data.web.redirect_uris[0]
            },
            async function(accessToken, refreshToken, profile, done) {
                userProfile={
                    id:profile.id,
                };
                console.log("accessToken: " + accessToken)
                console.log("refreshToken: " + refreshToken)
                console.log(userProfile)
                let rest = await Db.collection("googleUsers").doc(userProfile.id).get()
                    .then(async docSnapshot => {
                        console.log("Doc Exist :" + docSnapshot.exists)
                        if (!docSnapshot.exists) {
                            let docRef = Db.collection("googleUsers").doc(profile.id)
                            profile._json.Authority = 1
                            console.log(profile._json)
                            await docRef.set(profile._json,{merge: true})
                        }
                    });
                //let docRef = Db.collection("googleUsers").doc(profile.id)
                //console.log(docRef)
                //await docRef.set(profile._json,{merge: true})
                return done(null, userProfile);
            }
        )
    );

    passport.use('googleApi', //passport.authenticate('google'), use name of google passport
        new GoogleStrategy(
            {
                clientID: OAuth2Data.web.client_id,
                clientSecret: OAuth2Data.web.client_secret,
                callbackURL: OAuth2Data.web.redirect_uris[1]
            },
            async function(accessToken, refreshToken, profile, done) {
                userProfile={
                    id:profile.id,
                };
                driverToken={
                    DriverAccessToken:accessToken,
                    DriverRefreshToken:refreshToken,
                };
                console.log(profile)
                console.log(userProfile)
                let docRef = Db.collection("googleUsers").doc(profile.id)
                await docRef.set(driverToken,{merge: true})
                return done(null, userProfile);
            }
        )
    );

    refresh.use('googleApi', //passport.authenticate('google'), use name of google passport
        new GoogleStrategy(
            {
                clientID: OAuth2Data.web.client_id,
                clientSecret: OAuth2Data.web.client_secret,
                callbackURL: OAuth2Data.web.redirect_uris[1]
            },
            async function(accessToken, refreshToken, profile, done) {
                userProfile={
                    id:profile.id,
                };
                driverToken={
                    DriverAccessToken:accessToken,
                    DriverRefreshToken:refreshToken,
                };
                console.log(profile)
                console.log(userProfile)
                let docRef = Db.collection("googleUsers").doc(profile.id)
                await docRef.set(driverToken,{merge: true})
                return done(null, userProfile);
            }
        )
    );
}

module.exports = googleAuth