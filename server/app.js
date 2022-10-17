const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 8000;
const cors = require('cors');
app.use(cors());
app.use(cors({origin: '*'}));
app.use(require('./routes/contactRoute'));



// const accountSid = 'AC082ef748161cee47acb7446dc4d75e3f';
// 		const authToken = 'c16f81e3515ed2971a3b6a45247a1a34';
// 		const client = require('twilio')(accountSid, authToken,{logLevel: 'debug'});

// 		client.messages
// 			.create({
// 				body:"hello",
// 				from: '+19412001459',
// 				to: '+919628281021',
// 				messagingServiceSid: 'MG6787a064cd862049ba02b115fc36b9e8',     

// 			})
// 			.then((response)=>{
// 				console.log(response,'@@@@@@@@@@@@')
// 			})
// 			.done();



app.get('/', (req, res) => {
    return res.json({
    	error: false,
    	data: 'OK' 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
