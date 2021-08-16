'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const { seedUserData } = require('./models/user.model.js');
const { getRecipes, createRecipe, deleteRecipe, updateRecipe } = require('./controller/recipe.controller');

mongoose.connect(`${MONGO_DB_URL}/recipes`, { useNewUrlParser: true, useUnifiedTopology: true });
server.get('/', homeHandler);
function homeHandler(req, res) {
    res.send('Home Route');
}

server.use(cors());
server.use(express.json());

// seedUserData();

server.get('/recipes', getRecipes);
server.post('/recipe', createRecipe);
server.delete('/recipe/:recipe_id', deleteRecipe);
server.put('/recipe/:recipe_id', updateRecipe);

server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});