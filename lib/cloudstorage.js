// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage')
const config = require('../config/cloudstorage.json')

module.exports = class StorageController {
  constructor () {
    this.storage = new Storage({
      projectId: config.project_id,
      keyFilename: './config/firestore.json',
    })
  }

  /*
   * get Bucket list
   */
  async listBuckets() {
    const [buckets] = await this.storage.getBuckets()
    buckets.forEach(bucket => {
      console.log(bucket.name)
    });
  }

  /*
  *get Bucket file struct
  */
  async getBuckets (bucketname, path) {
    const bucket = this.storage.bucket(bucketname)
    const option = {
      autoPaginate: false, // 預設是true，改成false才會有apiResponse
      prefix: path, // 從哪個path找起
      delimiter: '/' // 過濾結果
    }

    return new Promise((resolve, reject) => {
      bucket.getFiles(option, function (err, files, next, apiResponse) {
        if (err) {
          reject(err)
        } else {
          const result = {}
          const fileoutput = []
          files.forEach(buckets => {
            if (buckets.name !== path) {
              fileoutput.push(buckets.name)
            }
            console.log(buckets.name)
          })
          result.file = fileoutput
          result.folder = apiResponse.prefixes
          resolve(result)
        }
      })
    })
}

if (require.main === module) {
  async function test(){
    const square = new StorageController();
    let result = await square.getBuckets("ushow","cash_net_management/test_gcp/")
    console.log('result => ',result)
  }
  test()
}