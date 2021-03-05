const Firestore = require('@google-cloud/firestore');
const config = require("../config/firestore.json")

db = new Firestore({
    projectId: config.project_id,
    keyFilename: './config/firestore.json',
});

module.exports = db;