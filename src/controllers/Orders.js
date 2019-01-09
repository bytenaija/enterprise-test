const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({
    accessToken: process.env.MAPBOX_ACCESS_TOKEN
});

let Orders = require('../models/Orders')

module.exports = {
    createOrder: (req, res) => {
        let START_LATITUDE = req.body.origin[0],
            START_LONGITUDE = req.body.origin[1];
        let END_LATITUDE = req.body.destination[0],
            END_LONGITUDE = req.body.destination[1]

        console.log(START_LATITUDE, START_LONGITUDE, END_LATITUDE, END_LONGITUDE, process.env.MAPBOX_ACCESS_TOKEN);

        directionsClient
            .getDirections({
                waypoints: [{
                        coordinates: [START_LATITUDE, START_LONGITUDE],
                        approach: 'unrestricted'
                    },
                    {
                        coordinates: [END_LATITUDE, END_LONGITUDE]
                    },

                ]
            })
            .send()
            .then(response => {
                const directions = response.body;
                let distance = directions.routes[0].distance;
                distance = parseFloat(Math.round(distance / 1000 * 100) / 100).toFixed(2);
                console.log(distance)

                res.status(200).json({distance});

                Orders.create({
                        distance
                    })
                    .then(order => {
                        res.status(200).json(order)
                    }).catch(err => {
                        res.status(500).json({
                            error: 'We could not create your order. Please try again.'
                        })
                    })
            }).catch(err => res.status(500).json({ error: "An error occured with our distance API. Please try again later"}))

    },

    takeOrder: (req, res) => {
        let {id} =  req.params;
        Orders.findById(id).then(async order =>{
            if(order.status !== 'UNASSIGNED'){
                res.status(500).json({error: 'This order has already been taken.'})
            }else{
                order.status = req.body.status;
               order.save().then(order => {
                res.status(200).json({})
               })

                
            }
        })
    },

    getOrders: (req, res) => {

    }
}