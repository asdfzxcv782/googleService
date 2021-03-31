const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    let username = req.user.name
    await req.logOut(); //logout
    res.send(username + "  logged out!")
    //res.redirect('/login');
});



module.exports = router;