let express = require('express');
let cors = require('cors');
let morgan = require('morgan');


let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

require('dotenv').config();
let orderRoutes = require('./routes/Orders.route') 

app.use(cors());
app.use(morgan('dev'));

app.get("/", (req, res)=>{
    res.json({success: true, message: 'I am very happy'})
})

app.use(orderRoutes);

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server runNing on PORT ${PORT}`));

