let mongoose = require('mongoose')

let orderSchema = mongoose.Schema({
distance: {type: Number, required: true},
status: {type: String, required: true, default: 'UNASSIGNED'},
// origin: {lat: {
//     type: String,
// },
// lon: {
//     type: String
// }},

// destination: {lat: {
//     type: String,
// },
// lon: {
//     type: String
// }}
},{
    timestamps: true
})

module.exports =  mongoose.model('Order', orderSchema)
