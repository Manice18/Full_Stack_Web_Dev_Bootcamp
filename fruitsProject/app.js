const { MongoClient } = require("mongodb");//require pakage
 
const uri = "mongodb://0.0.0.0:27017/"; //url
 
const client = new MongoClient(uri);
 
async function run() {
  try {
      //write your code here:
      
      
    console.log("Sever Connected");
    const database = client.db('takDB');//creates database if not exists  
 
    const collection = database.collection('taks');//creates collection if not exists
    
    //creates the data
    await collection.insertMany([
        {
            _id:1,
            name:"mango",
            price:32
        },
        {
            _id:2,
            name:"apple",
            price:12,
        },
        {
            _id:3,
            name:"coconut",
            price:5
        }
    ]);
    
    //for loop to print the data
    for (let i = 1; i <= 3; i++) {
        field = await collection.findOne({_id:i});
        console.log(field);
    }
 
 
 
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);