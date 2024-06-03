const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Chocolate Server Running")
})

const uri = "mongodb+srv://portfolio:doMyzRApQXHPx3hK@cluster0.elswfsp.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
    const db = client.db('portfolio');
    const projectCollection = db.collection('projects');
    const skillCollection = db.collection('skills');
    const blogCollection = db.collection('blogs');

    app.get("/projects", async (req, res) => {
      const response = await projectCollection.find().toArray()

      res.status(201).json({
        success: true,
        message: 'Projects Retrieved successfully',
        response
      });
    })

    app.get("/projects/:id", async (req, res) => {
      const id = req.params
      const project = { _id: new ObjectId(id) }
      const response = await projectCollection.findOne(project)

      res.status(201).json({
        success: true,
        message: 'Project Retrieved successfully',
        response
      });

    })

    app.post("/projects", async (req, res) => {
      const projects = req.body;
      await projectCollection.insertOne(projects)
      res.status(201).json({
        success: true,
        message: 'Project Posted successfully'
      });
    })

    app.get("/skills", async (req, res) => {
      const response = await skillCollection.find().toArray()

      res.status(201).json({
        success: true,
        message: 'Skills Retrieved successfully',
        response
      });
    })

    app.post("/skills", async (req, res) => {
      const skills = req.body;
      await skillCollection.insertOne(skills)
      res.status(201).json({
        success: true,
        message: 'Skill Posted successfully'
      });
    })

    app.get("/blogs", async (req, res) => {
      const response = await blogCollection.find().toArray()

      res.status(201).json({
        success: true,
        message: 'Blogs Retrieved successfully',
        response
      });
    })

    app.post("/blogs", async (req, res) => {
      const blogs = req.body;
      await blogCollection.insertOne(blogs)
      res.status(201).json({
        success: true,
        message: 'Blog Posted successfully'
      });
    })


    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`App is Running on Port ${port}`)
})