let express = require('express');
let cors = require('cors');
let morgan = require('morgan');
let mongoose = require('mongoose');
let db = require('./database')

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

require('dotenv').config();
let orderRoutes = require('./routes/Orders.route') 

app.use(cors());
app.use(morgan('dev'));


mongoose.connect(db.MONGO_URL, (err)=>{
   
    console.log("Environment", process.env.NODE_ENV)
    if(err){
       throw err
    }else{
       
        console.log("Connected to MongoDB")
        
    }
})

app.use(orderRoutes);

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server runNing on PORT ${PORT}`));

module.exports = app;