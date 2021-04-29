const express = require('express')
const router = express.Router()
const Db = require('../lib/firestore.js')

router.get('/getRequestMenu', async function (req, res) {
  if (!req.query.createdAt) {
    var startAfterLocate = 0
  } else {
    var startAfterLocate = Number(req.query.createdAt)
  }
  console.log(startAfterLocate)
  const Users = Db.collection('googleUsers')
  Users.orderBy('createdAt')
    .limit(2)
    .startAfter(startAfterLocate)
    .get()
    .then((querySnapshot) => {
      const final = []
      querySnapshot.forEach((doc) => {
        const result = {}
        result.id = doc.id
        result.user = doc.data().email
        result.authority = doc.data().Authority
        result.createdAt = doc.data().createdAt
        final.push(result)
        console.log(final)
      })
      res.send({
        Syscode: 200,
        Data: final
      })
    }).catch((error) => {
      res.send({
        Syscode: 400,
        Message: error
      })
    })
})

router.post('/allow', async function (req, res) {
  console.log(req.body)
  const docRef = Db.collection('googleUsers')
    .doc(req.body.userId)
  await docRef.update({ Authority: req.body.authority })
    .then(() => {
      res.send({
        Syscode: 200,
        Message: `Change ${req.body.userId} authority to ${req.body.authority} complete!`
      })
    }).catch((error) => {
      res.send({
        Syscode: 400,
        Message: error
      })
    })
})

module.exports = router
