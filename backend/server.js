const express = require('express');
const app = express();
const PORT = 3000;

// This tells the server to start listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const fs = require('fs');
const path = require('path');

app.get('/brands/:name', (req, res) => {
  const brandName = req.params.name.toLowerCase(); 
  const dataPath = path.join(__dirname, 'brands.json');

  fs.readFile(dataPath, 'utf-8', (err, data) =>{
    if (err){
      return res.status(500).send({error: "Problem reading data file"});
    }

    const brands = JSON.parse(data);

    if (brands[brandName]){
      res.send(brands[brandName]);
    }else{
      res.status(404).send({message: "brand not found"});
    }
  })
})


//connect to mongodb database 
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ifeoluwaolusoga23:oluife191105@fastfashiondb.lyqislj.mongodb.net/?retryWrites=true&w=majority&appName=fastfashiondb";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
