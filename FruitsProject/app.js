const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitDB', {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[1,"Please check ur entry no name has been specified"]
  },
  rating: {
   type: Number,
   min: 1,
   max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit (
  {
    //name: "Apple", in the data validation module this was an activity 
    rating: 5,
    review:"PeachyRedness"
  }
);
 //fruit.save();


const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
  });
const Person = mongoose.model("Person", personSchema);
const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review:"YellowSharp"
});
//pineapple.save();
const amy = new Person (
  {
    name: "Amy Roberts",
    age: 16,
    favouriteFruit: pineapple,
  }
);
//amy.save();
const person = new Person (
  {
    name: "John",
    age: 35,
  }
);
//person.save();
const mango = new Fruit({
  name: "Mango",
  score: 10,
  review:"FruitKing"
});
mango.save();
Person.updateOne({name:"John"},{favouriteFruit: mango},function (err) {
  if(err){
    console.log(err);
  }else{
    console.log("Updated john to have 'mangoes' as favourite fruit");
  }
});



const kiwi = new Fruit (
  {
    name: "Kiwi",
    rating: 10,
    review:"Never Tried"
  }
);
//kiwi.save();
const orange = new Fruit (
  {
    name: "Orange",
    rating: 9,
    review:"Love it"
  }
);
//orange.save();
const banana = new Fruit (
  {
    name: "Banana",
    rating: 7,
    review:"Sweet Minion"
  }
);
//banana.save();
const grapes = new Fruit (
  {
    name: "grapes",
    rating: 4,
    review:"Green Sour"
  }
);
const dates = new Fruit (
  {
    name: "Dates",
    rating: 8,
    review:"Rich Texture"
  }
);
// Fruit.insertMany([grapes,dates],function (err) {
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfullly added grapes and dates to fruitdb");
//   }
// });
Fruit.find(function (err,fruitsResult) {
    if(err){
      console.log(err);
    }else{
      mongoose.connection.close();
      fruitsResult.forEach(element => {
        console.log(element.name);
      });
    }
  });
// Fruit.updateOne({_id: "6005180167fc2f3b2050d12c"},{name: "Peach"},function (err) {
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Updated Peaches successfully");
//   }
// });

// Fruit.deleteOne({name: "Peach"},function (err) {
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Deleted Peach successfully");
//   }
// });

// Person.deleteMany({name: "John"},function (err) {
//     if(err){
//       console.log(err);
//     }else{
//       console.log("Deleted Person JOhn successfully");
//     }
//   });











//    ################################################MonngoDb Native Driver NodeJS Code down |||||###############################################

/*
const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb://localhost:27017/?poolSize=20&writeConcern=majority";
  //mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false

// Create a new MongoClient
const client = new MongoClient(uri,{ useUnifiedTopology: true });

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db("fruitdb");
    const collection = database.collection("fruits");


    //Insertion कोड नीचे omment kr दिया गया है | Find कोड niche लिखा गया है, यह जानने के लिए फिर से विडियो देखें Angela Yu : Working with The Native MongoDB Driver
    // create a document to be inserted
    // create an array of documents to insert
    const docs = [
        { name: "Banana", score: 7,review: "YellowishSweetness" },
        { name: "Grape", score: 5,review: "SourGreen" },
        { name: "Apple", score: 9,review: "AntiDoctor" },
      ];
      // this option prevents additional documents from being inserted if one fails
      const options = { ordered: true };
      const result = await collection.insertMany(docs, options);
      console.log(`${result.insertedCount} documents were inserted`);                                         



    //Finding ka code ye rha below ||||
    
    // Query for a fruit that has the name 'Banana'
    const query = { name: "Banana" };
    const options = {
      // Include only the `name` and `score`'review' fields in the returned document
      projection: { _id: 0, name: 1, score: 1,review: 1 },
    };
    const data = await collection.findOne(query, options);
    // since this method returns the matched document, not a cursor, print it directly
    console.log(data);                                                                                        
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);                                          */
