let mongoose = require('mongoose')

let orderSchema = mongoose.Schema({
distance: {type: Number, required: true},
status: {type: String, required: true, default: 'UNASSIGNED'}
},{
    timestamps: true
})

module.exports =  mongoose.model('Order', orderSchema)
