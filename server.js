import dotenv from "dotenv"; 
dotenv.config();
import express from "express";
import { MongoClient } from "mongodb";
import swaggerUi from "swagger-ui-express";
import recipesRouter from "./routes/recipes.js";


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db("recipesDB"); // new database
const recipes = db.collection("recipes");

// ROUTES
app.use("/recipes", recipesRouter(recipes));

app.listen(port, () => console.log(`Server running on port ${port}`));
