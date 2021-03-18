const express = require('express');
const router = express.Router();
const Db = require("../lib/firestore.js");

router.get('/', async function(req, res) {
    res.render('admin',{'name':req.user.name})
});

router.get('/getRequestMenu',async function(req,res){
    let Users = Db.collection("googleUsers")
    Users.where('NeedPermission', '==', true).get()
        .then((querySnapshot) => {
            let final = []
            querySnapshot.forEach((doc) => {
                let result = {}
                result[doc.id] = doc.data().email
                final.push(result);
                console.log(doc.id, " => ", doc.data());
            });
            res.render('admin',{'data':final});
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
})

router.get('/allow',async function(req,res){
    console.log(req.query.userId)
    let docRef = Db.collection("googleUsers").doc(req.query.userId);
    await docRef.update({NeedPermission:false})
        .then(() => {
            res.send("Complete")
        })
        .catch((error) => {
            res.send("SomethingWrong: " + error) 
        })
})



module.exports = router;