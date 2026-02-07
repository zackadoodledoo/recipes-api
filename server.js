import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

dotenv.config();
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
