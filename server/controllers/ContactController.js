const ContactDB = require("../database/contact");
const TokenDB = require("../database/token");
const fs = require("fs");

exports.add = (req, res) => {

	if (!req.body) {
		return res.json({ error: true, message: 'contact,phone field is required ?' });
	}
	const body = req.body;
	if (!body.name) {
		return res.json({ error: true, message: 'name field is required ?' });
	}
	if (!body.phone) {
		return res.json({ error: true, message: 'phone field is required ?' });
	}

	ContactDB.push({ "name": body.name, "phone": body.phone })
	try {
		fs.writeFile(__dirname + '/../database/contact.json', JSON.stringify(ContactDB), err => {
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

exports.listToken = (req, res) => {
	return res.json({ error: false, data:TokenDB  });
}


exports.sendToken = (req, res) => {
	return res.json({ error: false, data: [] });
}
