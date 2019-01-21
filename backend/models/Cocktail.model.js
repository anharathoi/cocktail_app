const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User.js')


const cocktailSchema = new Schema ({
   title: String,
   photo: String,
   description: String,
   directions: String,
   ingredients: String,
   available: Boolean,
   createdBy:  {type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Cocktail', cocktailSchema)


