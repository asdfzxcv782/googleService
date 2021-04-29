const express = require('express')
const router = express.Router()

router.get('/', async function (req, res) {
  const username = req.user.name
  await req.logOut() // logout
  res.send({
    Syscode: 200,
    Message: `${username} logged out!`
  })
})

module.exports = router
