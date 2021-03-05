const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2()
const refresh = require('passport-oauth2-refresh')
const Db = require("../lib/firestore.js");

router.get('/',function(req,res){
    res.render('main',{'name':req.user.name})
    //res.send(req.user);
});

router.get('/getDriver',async (req,res)=>{
    let token = await Db.collection("googleUsers").doc(req.user.sub).get();
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
                console.log(err.code);
                let refreshToken = await Db.collection("googleUsers").doc(req.user.sub).get();
                refresh.requestNewAccessToken('googleApi', await refreshToken.data().DriverRefreshToken, async function(err, accessToken) {
                    console.log(accessToken)
                    if(err || !accessToken) { return send401Response(); }
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