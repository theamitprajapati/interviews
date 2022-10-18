const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(cors({origin: '*'}));
app.use(require('./routes/contactRoute'));
require('dotenv').config()

app.get('/', (req, res) => {

   

    return res.json({
    	error: false,
    	data: 'OK' 
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
