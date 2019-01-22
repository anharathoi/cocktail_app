const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cocktailSchema = new Schema ({
   title: String,
   photo: String,
   description: String,
   directions: String,
   ingredients: String,
   available: Boolean
})

module.exports = mongoose.model('Cocktail', cocktailSchema)


