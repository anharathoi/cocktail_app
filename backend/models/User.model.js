const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: Number, 
    deliveryAddress: String,
    dateJoined: {
        type: Date,
        default: Date.now
    },
    numberOfOrders: Number,
    stripeId: String,
    active: Boolean,
    admin: Boolean,
})

module.exports = mongoose.model('User', userSchema)

/**
|--------------------------------------------------
| update these to the following layout:
email: {
    type: String,
    required: true
},
and so on - this is to make fields required 
|--------------------------------------------------
*/

