const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User.model.js')
const Cocktail = require('./Cocktail.model.js')

const orderSchema = new Schema ({
    price: Number,
    dateOrdered: Date,
    billingCycle: Date,
    gst: Number,
    shipping: Number,
    dateShipped: Date,
    cocktail_id: {type: Schema.Types.ObjectId, ref: 'Cocktail' },
    user_id:  {type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Order', orderSchema)