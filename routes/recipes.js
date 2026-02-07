import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

export default function (recipes) {
  // GET all recipes
  router.get("/", async (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get all recipes'
    const allRecipes = await recipes.find().toArray();
    res.json(allRecipes);
  });

  // GET recipe by ID
  router.get("/:id", async (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get recipe by ID'
    const recipe = await recipes.findOne({ _id: new ObjectId(req.params.id) });
    recipe ? res.json(recipe) : res.status(404).send("Recipe not found");
  });

  // POST new recipe
  router.post("/", async (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Add new recipe'
    // #swagger.parameters['body'] = { in: 'body', description: 'Recipe data', schema: { $ref: '#/components/schemas/Recipe' } }
    const newRecipe = req.body;
    const result = await recipes.insertOne(newRecipe);
    res.status(201).json(result);
  });

  // PUT update recipe
  router.put("/:id", async (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Update recipe by ID'
    const updated = await recipes.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    updated.modifiedCount > 0
      ? res.json({ message: "Recipe updated" })
      : res.status(404).send("Recipe not found");
  });

  // DELETE recipe
  router.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Delete recipe by ID'
    const deleted = await recipes.deleteOne({ _id: new ObjectId(req.params.id) });
    deleted.deletedCount > 0
      ? res.json({ message: "Recipe deleted" })
      : res.status(404).send("Recipe not found");
  });

  return router;
}
