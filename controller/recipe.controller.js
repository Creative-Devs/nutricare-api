'use strict';

const { userModel } = require('../models/user.model.js');

const getRecipes = (request, response) => {
    const { email } = request.query;
    userModel.find({ ownerEmail: email }, (error, user) => {
        if (error) {
            response.send(error)
        } else {
            response.json(user)
        }
    });
}
const createRecipe = (req, res) => {

    const ownerEmail = req.body.ownerEmail;
    const label = req.body.label;
    console.log(label);
    const image = req.body.image;
    console.log(image);
    const calories = req.body.calories;
    console.log(calories);
    const totalWeight = req.body.totalWeight;
    console.log(totalWeight);
    const url = req.body.url;
    console.log(url);
    console.log(req.body);

    const newRecipe = new userModel({
        label,
        image,
        calories,
        totalWeight,
        url,
        ownerEmail: ownerEmail,
    });

    console.log(newRecipe);
    newRecipe.save();
    res.json(newRecipe);
}

const deleteRecipe = (req, res) => {
    const id = req.params.recipe_id;

    userModel.deleteOne({ _id: id }, (error, recipe) => {
        res.json(recipe.deletedCount);
    });
}
const updateRecipe = async (req, res) => {
    const recipeId = req.params.recipe_id;
    const { label, image, calories, totalWeight, url } = req.body;

    userModel.findByIdAndUpdate(
        { _id: recipeId },
        {
            label: label,
            image: image,
            calories: calories,
            totalWeight: totalWeight,
            url: url,
        },
        { new: true },
        (err, data) => {
            res.send(data);
        })
}
module.exports = {
    getRecipes,
    createRecipe,
    deleteRecipe,
    updateRecipe
}