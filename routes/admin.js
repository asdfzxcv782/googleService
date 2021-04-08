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
                //result.seen = true
                //result[doc.id] = doc.data().email
                final.push(result);
                console.log(final);
            });
            res.send(final)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
            res.status(400).send(error);
        });
})

router.post('/allow',async function(req,res){
    console.log(req.body)
    let docRef = Db.collection("googleUsers").doc(req.body.userId);
    await docRef.update({Authority:req.body.authority})
        .then(() => {
            res.send(`Change ${req.body.userId} authority to ${req.body.authority} complete!`)
        })
        .catch((error) => {
            res.status(400).send(error) 
        })
})





module.exports = router;