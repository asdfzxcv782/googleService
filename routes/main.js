const express = require('express')
const router = express.Router()
const { google } = require('googleapis')
const oauth2Client = new google.auth.OAuth2()
const refresh = require('passport-oauth2-refresh')
const Db = require('../lib/firestore.js')
const syscode = require('../lib/syscode.json')

router.get('/', function (req, res) {
  res.render('vue')
})

router.get('/main', function (req, res) {
  res.render('vue')
})

router.get('/userInfo', async function (req, res) {
  if (req.user.Authority === 1) {
    console.log('permission denied')
    res.send({
      Syscode: 401,
      Message: syscode[401]
    })
  } else {
    const user = {
      Authority: req.user.Authority,
      locale: req.user.locale,
      sub: req.user.sub,
      picture: req.user.picture,
      email: req.user.email,
      name: req.user.name
    }
    res.send({
      Syscode: 200,
      User: user
    })
  }
})

router.get('/InvalidCache', function (req, res) {
  console.log(req.user)
})

router.get('/getDriver',async (req,res)=>{
    let token = await Db.collection("googleUsers").doc(req.user.sub).get();
    console.log(token.data().DriverAccessToken)
    /*if(!token.data().DriverAccessToken){
        res.redirect('login/googleApi')
        return ""
    }*/
    oauth2Client.setCredentials({
        'access_token': token.data().DriverAccessToken
    });
    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
    });
    async function listFiles(drive) {
        await drive.files.list({
          pageSize: 10,
          fields: 'nextPageToken, files(id, name)',
        },async (err ,result) =>{
            if(err){
                console.log(err);
                let refreshToken = await Db.collection("googleUsers").doc(req.user.sub).get();
                refresh.requestNewAccessToken('googleApi', await refreshToken.data().DriverRefreshToken, async function(err, accessToken) {
                    console.log(err)
                    console.log(accessToken)
                    if(err || !accessToken) {
                        /*res.send({
                            Syscode:404,
                            Message:"refreshToken Error"
                        })*/
                        res.redirect('login/googleApi')
                    }
                    let docRef = Db.collection("googleUsers").doc(req.user.sub)
                    await docRef.update({DriverAccessToken:accessToken})
                    oauth2Client.setCredentials({
                        'access_token': accessToken
                    });
                    console.log("resfresh end")
                    listFiles(drive);
                });
                //res.sendStatus(err.code)
                //return err;
            }else{
                let files = result.data.files;
                res.send(files)
            }
        })
    }
    listFiles(drive)
})



module.exports = router;