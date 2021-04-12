const express = require('express');
const router = express.Router();
const Db = require("../lib/firestore.js");

router.get('/getRequestMenu',async function(req,res){
    let Users = Db.collection("googleUsers")
    Users.get()
        .then((querySnapshot) => {
            let final = []
            querySnapshot.forEach((doc) => {
                let result = {}
                result.id = doc.id
                result.user = doc.data().email
                result.authority = doc.data().Authority
                final.push(result);
                console.log(final);
            });
            res.send({
                Syscode:200,
                Data:final
            })
        })
        .catch((error) => {
            res.send({
                Syscode:400,
                Message:error
            })
        });
})

router.post('/allow',async function(req,res){
    console.log(req.body)
    let docRef = Db.collection("googleUsers").doc(req.body.userId);
    await docRef.update({Authority:req.body.authority})
        .then(() => {
            res.send({
                Syscode:200,
                Message: `Change ${req.body.userId} authority to ${req.body.authority} complete!`
            })
        })
        .catch((error) => {
            res.send({
                Syscode:400,
                Message:error
            })
        })
})





module.exports = router;