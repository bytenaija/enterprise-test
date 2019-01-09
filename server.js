let express = require('express');
let cors = require('cors');
let morgan = require('morgan');


let app = express();

require('dotenv').config();

app.use(cors());
app.use(morgan('dev'));

app.get("/", (req, res)=>{
    res.send('We are running')
})
let PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server runNing on PORT ${PORT}`));

