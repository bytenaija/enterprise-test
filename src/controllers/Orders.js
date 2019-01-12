const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({
    accessToken: process.env.MAPBOX_ACCESS_TOKEN
});

let Orders = require('../models/Orders')

module.exports = {
    createOrder: (req, res) => {
        try{

        
        let START_LATITUDE = req.body.origin[0],
            START_LONGITUDE = req.body.origin[1];
        let END_LATITUDE = req.body.destination[0],
            END_LONGITUDE = req.body.destination[1]


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
                distance = parseFloat(Math.abs(Math.round(distance * 100) / 100)).toFixed(2);
              
                let newOrder = {
                    distance,
                    // origin: {
                    //     lat: START_LATITUDE,
                    //     lon: START_LONGITUDE
                    // },
                    // destination:{
                    //     lat: END_LATITUDE,
                    //     lon: END_LONGITUDE
                    // }
                }
              
               
                Orders.create(newOrder)
                    .then(order => {
                        res.status(200).json({id: order._id, distance: order.distance, status: order.status})
                    }).catch(err => {
                        res.status(500).json({
                            error: 'We could not create your order. Please try again.'
                        })
                    })
            }).catch(err => res.status(500).json({ error: "An error occured with our distance API. Please try again later"}))
        }catch(err){
            res.status(500).json({ error: "An error occured . Please try again later"})
        }

    },

    takeOrder: (req, res) => {
        let {id} =  req.params;
        Orders.findById(id).then(async order =>{
            if(order.status !== 'UNASSIGNED'){
                res.status(500).json({error: 'This order has already been taken.'})
            }else{
                order.status = req.body.status;
               order.save().then(order => {
                res.status(200).json({status: 'SUCCESS' })
               }).catch(err =>{
                   res.status(500).json({error: 'An error occured that prevent you taking this order. Please try again.'})
               }) 
            }
        }).catch(err =>{
            res.status(500).json({error: 'An error occured that prevent you taking this order. Please try again.'})
        })
    },

    getOrders: (req, res) => {
        let {page, limit} = req.query;
        page = page? parseInt(page): 0;
        limit = limit? parseInt(limit): 20;
        Orders.find({}).limit(limit).skip(page).then(orders =>{
            let parsedOrders = []
            orders.forEach(order =>{
                parsedOrders.push({id: order._id, distance: order.distance, status: order.status});
            })
            res.status(200).json({orders: parsedOrders})
        })
        
    }
}