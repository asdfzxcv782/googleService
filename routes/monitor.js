const express = require('express')
const router = express.Router()
const Db = require('../lib/firestore.js')

router.get('/', function (req, res) {
  const status = Db.collection("serverStatus")
  status.get()
    .then((querySnapshot) => {
      let data = []
      querySnapshot.forEach((doc) => {
        let result = doc.data()
        data.push(result)
      })
      return data
    })
    .then((data) =>{
      res.send(data)
    })
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
