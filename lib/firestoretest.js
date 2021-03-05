const Firestore = require('@google-cloud/firestore');
const config = require("../config/firestore.json")

class FirestoreHnadle {
  constructor() {
    this.db = new Firestore({
      projectId: config.project_id,
      keyFilename: './config/firestore.json',
    });
  }

  async set(users,doc,data,merge){
    const docRef =this.db.collection(users).doc(doc);
    //await docRef.set(data);
    return await docRef.set(data,{merge: merge})
    .then(result => {
      return result
      console.log('Successfully executed write at: ', result._writeTime);
    })
    .catch(err => {
      return err 
      console.log('Write failed with: ', err);
    });
  }

  async get(collection,docs){
    const snapshot = this.db.collection(collection).doc(docs);
    const doc = await snapshot.get();
    if (!doc.exists) {
      console.log('No such document!');
      return 'No such document!'
    } else {
      return doc.data();
    }


    /*const snapshot = await this.db.collection('user').get();
    console.log(snapshot.docs.map(doc => doc.id));*/
    
  }

}

module.exports = FirestoreHnadle;

if (require.main === module) {
  async function setTest(){
    const square = new FirestoreHnadle();
    let result = await square.set('googleUsers','105341350685655298340',{
      displayName: 'hank lee'
    })
    console.log(result);
  }
  async function test(){
    const square = new FirestoreHnadle();
    //await square.set('user','ushowBasicAuth')
    let result = await square.get('user','ushowBasicAuth')
    console.log('result => ',result.name)
  }
  
  setTest();
  test();
  //console.log(test)
}

/*const db = new Firestore({
  projectId: config.project_id,
  keyFilename: './config/firestore.json',
});

async function set(){
  const docRef =db.collection('users').doc('ushowBasicAuth');
  await docRef.set({
    name: "ushow",
    password: "vshow2351700"
  });
}

async function get(){
  const snapshot = await db.collection('users').get();
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
}

async function test(){
  await set();
  get();
}

//testing()
test();*/