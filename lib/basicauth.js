const Db = require('../lib/firestore.js')
const basicAuth = require('basic-auth')

async function auth (req, res, next) {
    req.user = basicAuth(req);
    const Users = Db.collection('user')
        .doc('ushowBasicAuth')
    let result = await Users.get()
    if ((req.user !== undefined && req.user['name'] == result.data().name  && req.user['pass'] == result.data().password )) {
      next();
    } else {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.end('Access denied');
    }
}

module.exports = auth