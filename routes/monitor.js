const express = require('express')
const router = express.Router()
const Db = require('../lib/firestore.js')

router.get('/:id', function (req, res) {
  const status = Db.collection('Server')
    .doc('Status')
    .collection(req.params.id)
  status.get()
    .then((querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        const result = doc.data()
        const final = {}
        final.cpuUsage = result.CpuUsage
        final.memoryFree = result.MemoryFree
        final.userName = result.userName
        final.createAt = doc.id
        data.push(final)
      })
      return data
    })
    .then((data) =>{
      res.send(data)
    })
})

router.get('/instance', async function (req, res) {
  const status = Db.collection('Server')
    .doc('Status')
  status.listCollections()
    .then((querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.id)
      })
      return data
    })
    .then((data) => {
      res.send(data)
    })
})

router.post('/', function (req, res) {
  const dateTime = Date.now().toString()
  const data = req.body
  data.createAt = dateTime
  const status = Db.collection('Server')
    .doc('Status')
    .collection(data.userName)
    .doc(dateTime)
  status.set(data)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send('test: ' + err)
    })
})

module.exports = router
