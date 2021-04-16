// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
const config = require("../config/cloudstorage.json")

// Creates a client
const storage = new Storage({
    projectId: config.project_id,
    keyFilename: './config/cloudstorage.json',
});

async function listBuckets() {
  const [buckets] = await storage.getBuckets();

  console.log(buckets[0].name);
  buckets.forEach(bucket => {
    console.log(bucket.name);
  });
}

listBuckets().catch(console.error);