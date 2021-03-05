const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    console.log(req.user.name + "  logged out!")
    await req.logOut(); //logout
    res.redirect('/login');
});



module.exports = router;