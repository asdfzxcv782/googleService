const { google } = require('googleapis');
const compute = google.compute('v1');
const oauth2 = google.oauth2('v2');
const express = require('express')
const OAuth2Data = require('./config/oauth.json')

const app = express()

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;

app.get('/', (req, res) => {
    if (!authed) {
        // Generate an OAuth URL and redirect there
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile'
            //scope: 'https://www.googleapis.com/auth/compute'
        });
        console.log(url)
        res.redirect(url);
    } else {
        console.log(oAuth2Client);
        const userinfo = oauth2.userinfo.get({ auth: oAuth2Client },(err,res) =>{
            if (err) {
                console.error(err);
                throw err;
            }
            console.log(res.data);
        });
        /*const request = {
            // Project ID for this request.
            project: 'ushow-project',  // TODO: Update placeholder value.
            // Name of the UrlMap scoping this request.
            urlMap: 'tomcat',  // TODO: Update placeholder value.
            resource: {
                path: "/crazy_games/config.json"
            },
            auth: oAuth2Client,
        };
        console.log(request)
        compute.urlMaps.invalidateCache(request, function(err, response) {
            if (err) {
              throw err
            }else{
              console.log(response)
            }
          })
        //const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });*/
        
        res.send(userinfo)
    }
})

app.get('/logout', function(req, res) {
    console.log("logged out!");
    res.redirect('https://accounts.google.com/logout');
});

app.get('/auth/google/callback', function (req, res) {
    const code = req.query.code
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                authed = true;
                res.redirect('/')
            }
        });
    }
});

const port = process.env.port || 8000
app.listen(port, () => console.log(`Server running at ${port}`));