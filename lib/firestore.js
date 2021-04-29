const Firestore = require('@google-cloud/firestore')
const config = require('../config/firestore.json')

const db = new Firestore({
  projectId: config.project_id,
  keyFilename: './config/firestore.json'
})

module.exports = db
