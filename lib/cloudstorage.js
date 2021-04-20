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
  
  buckets.forEach(bucket => {
    console.log(bucket.name);
  });
}

async function getBuckets(bucketname,path){
  //let bucketname = 'lunar-nuance-281305.appspot.com'
  let cb = (err,files,next,apiResponse) =>{
    console.log(option)
    console.log(apiResponse.prefixes)
    let result = {}
    let fileoutput = []
    files.forEach(buckets =>{
      if(buckets.name != path){
        fileoutput.push(buckets.name)
        //console.log("delete duplicate")
      }
      //fileoutput.push(buckets.name)
      console.log(buckets.name)
    })
    result.file = fileoutput
    result.folder = apiResponse.prefixes
    console.log(result)
  }
  let bucket = storage.bucket(bucketname);
  let option = {
    autoPaginate:false,
    prefix:path,
    delimiter: '/',
  }
  bucket.getFiles(option,cb);
}

//listBuckets().catch(console.error);
if (require.main === module) {
  getBuckets("ushow","cash_net_management/test_gcp/")
  //console.log(test)
}