const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/contactRoute'));
const PORT = 8000;

app.get('/', (req, res) => {
    return res.json({
    	error: false,
    	data: 'OK' 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
