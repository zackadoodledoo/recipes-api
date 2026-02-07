import dotenv from "dotenv"; 
dotenv.config();
import express from "express";
import { MongoClient } from "mongodb";
import swaggerUi from "swagger-ui-express";

console.log("MONGODB_URI:", process.env.MONGODB_URI);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db("recipesDB"); // new database
const recipes = db.collection("recipes");

// Simple test route for Swagger practice
app.get("/", (req, res) => {
  const name = req.query.name || "Guest";
  res.send(`Hello, ${name}!`);
});

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`Server running on port ${port}`));
