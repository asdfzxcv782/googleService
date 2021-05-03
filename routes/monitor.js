const express = require('express')
const router = express.Router()
const Db = require('../lib/firestore.js')

router.get('/', function (req, res) {
  res.send("hello")
})

router.post('/',function(req, res){
  let dateTime = Date.now().toString()
  console.log(Date.now())
  const status = Db.collection('serverStatus')
  .doc(dateTime)

  status.set(req.body)
  res.send(req.body)
})

module.exports = router
