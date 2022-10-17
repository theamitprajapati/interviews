const ContactDB = require("../database/contact");
const MessageDB = require("../database/message");
const fs = require("fs");
const accountSid = 'AC082ef748161cee47acb7446dc4d75e3f';
const authToken = 'c16f81e3515ed2971a3b6a45247a1a34';
const client = require('twilio')(accountSid, authToken, { logLevel: 'debug' });

exports.add = (req, res) => {

	if (!req.body) {
		return res.json({ error: true, message: 'First name Last  Name,Phone Number is required ?' });
	}
	const body = req.body;
	if (!body.fName) {
		return res.json({ error: true, message: 'First Name  is required ?' });
	}
	if (!body.lName) {
		return res.json({ error: true, message: 'Last Name  is required ?' });
	}
	if (!body.phone) {
		return res.json({ error: true, message: 'Phone Number is required ?' });
	}

	ContactDB.unshift({ "fName": body.fName, lName: body.lName, phone: body.phone })
	try {
		fs.writeFile(__dirname + '/../database/contact.json', JSON.stringify(ContactDB, null, "\t"), err => {
			if (err) throw err;
			res.json({ error: false, message: 'Contact add success!' });
		});
	} catch (e) {
		res.json({ error: true, message: e.message });
	}
};

exports.details = (req, res) => {
	const phone = req.params.phone;
	console.log(phone)
	if (!ContactDB.length) {
		return res.json({ error: true, message: 'Contact database not found' });
	}
	const data = ContactDB.filter((v) => phone === v.phone);


	if (!data.length) {
		return res.json({ error: true, message: "Invalid Phone Number ?" });
	}

	return res.json({ error: false, data: data[0] });
}
exports.list = (req, res) => {
	return res.json({ error: false, data: ContactDB });
}

exports.listMessage = (req, res) => {
	return res.json({ error: false, data: MessageDB });
}

exports.smsCallback = (req, res) => {
	console.log(res.body, res.query)
	return res.json({ error: false, data: 3 });
}


function sendSMS(){
	client.messages.create({
		body: "xxxxxxxxxxxx",
		from: '+19412001459',
		to: '+919628281021',
		messagingServiceSid: 'MG6787a064cd862049ba02b115fc36b9e8',
	})
		.then((response, ed) => {
			console.log(response, '@@@@@@@@@@@@', ed)
		})
		.catch((err) => console.log(err.message))
		.done();
}

exports.sendMessage = (req, res) => {

	sendSMS();



	if (!req.body) {
		return res.json({ error: true, message: 'Phone Number and Message is required ?' });
	}
	const body = req.body;
	if (!body.message) {
		return res.json({ error: true, message: 'Message  is required ?' });
	}

	if (!body.phone) {
		return res.json({ error: true, message: 'Phone is required ?' });
	}


	MessageDB.unshift({ name: body.name, otp: body.otp, phone: body.phone, message: body.message, created_time: (new Date()).getTime() })


	try {
		//send message here 
		fs.writeFile(__dirname + '/../database/message.json', JSON.stringify(MessageDB, null, "\t"), err => {
			if (err) throw err;
			res.json({ error: false, message: 'Message sent success!!!' });
		});
	} catch (e) {
		res.json({ error: true, message: e.message });
	}
}
