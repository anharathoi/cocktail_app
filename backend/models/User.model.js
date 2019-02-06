const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true
    },
    password: String,
    session: Boolean,
    phone: Number, 
    deliveryAddress: String,
    dateJoined: {
        type: Date,
        default: Date.now
    },
    numberOfOrders: Number,
    stripeId: String,
    active: Boolean,
    admin: {
        type: Boolean,
        default: false
    },
    selectedOption: String,
    paymentSource: Array,
    subscriptionId: String,
    streetAddress: String, 
    suburb: String, 
    postcode: Number, 
    ausState: String,
    orderList: Array,


})

module.exports = mongoose.model('User', userSchema)


//thinking that for ausState is could be a drop down

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

    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    // admin: {
    //     type: Boolean,
    //     default: false
    // }