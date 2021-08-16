'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    label: { type: String },
    image: { type: String },
    calories: { type: String },
    totalWeight: { type: String },
    url: { type: String },
    ownerEmail: { type: String },
});

const userModel = mongoose.model('users', userSchema);

const seedUserData = () => {
    const recipe1 = new userModel({
        label: 'Spaghetti Genovese',
        image: 'https://www.edamam.com/web-img/9b6/9b6b14b97280cc6074aeed785a3c152c.jpg',
        calories: '1916 kcal',
        totalWeight: '933 g',
        url: 'http://www.bbcgoodfood.com/recipes/1945/',
        ownerEmail: 'aboud.coding@gmail.com'
    });
    recipe1.save();
}

module.exports = { userModel, seedUserData }