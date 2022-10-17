const ContactDB = require("../database/contact");
const MessageDB = require("../database/message");
const fs = require("fs");

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

	ContactDB.unshift({ "fName": body.fName,lName:body.lName, phone: body.phone })
	try {
		fs.writeFile(__dirname + '/../database/contact.json', JSON.stringify(ContactDB,null, "\t"), err => {
			if (err) throw err;
			res.json({ error: false, message: 'Contact add success!' });
		});
	} catch (e) {
		res.json({ error: true, message: e.message });
	}
};

exports.details = (req, res) => {
	const phone = req.params.phone;
	if (!ContactDB.length) {
		return res.json({ error: true, message: 'Contact database not found' });
	}
	const data = ContactDB.filter((v) => phone === v.phone);

	if (!data.length) {
		return res.json({ error: true, message: "Contact  not found" });
	}

	return res.json({ error: false, data: data });
}
exports.list = (req, res) => {
	return res.json({ error: false, data: ContactDB });
}

exports.listMessage = (req, res) => {
	return res.json({ error: false, data:MessageDB  });
}


exports.sendMessage = (req, res) => {
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


	MessageDB.unshift({ phone: body.phone,message:body.message, created_time: (new Date()).getTime()})
	try {
		fs.writeFile(__dirname + '/../database/message.json', JSON.stringify(MessageDB,null, "\t"), err => {
			if (err) throw err;
			res.json({ error: false, message: 'Message sent success!' });
		});
	} catch (e) {
		res.json({ error: true, message: e.message });
	}
}
