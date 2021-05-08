const express = require('express')
const router = express.Router()
const Db = require('../lib/firestore.js')

router.get('/instance/:id', function (req, res) {
  console.log(req.params.id)
  const status = Db.collection('Server')
    .doc('Status')
    .collection(req.params.id)
  status.get()
    .then((querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        const result = doc.data()
        const final = {}
        const utc8Date = new Date(Number(doc.id)).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
        final.cpuUsage = result.CpuUsage
        final.memoryFree = result.MemoryFree
        final.userName = result.userName
        final.createAt = utc8Date
        data.push(final)
      })
      return data
    })
    .then((data) =>{
      res.send(data)
    })
})

router.get('/instance', function (req, res) {
  const status = Db.collection('Server')
    .doc('Status')
  status.listCollections()
    .then((querySnapshot) => {
      const data1 = []
      querySnapshot.forEach((doc) => {
        console.log(data1)
        data1.push(doc.id)
      })
      return data1
    })
    .then((response) => {
      res.send(response)
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
