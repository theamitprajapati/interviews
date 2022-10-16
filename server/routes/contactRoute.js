var router = require('express').Router();
const ContactController = require('../controllers/ContactController');
router.get('/contact/add', ContactController.add);
router.get('/contact/details/:phone', ContactController.details);
router.get('/contact/list', ContactController.list);
router.post('/sendToken', ContactController.sendToken);
// router.get('/sent-sms', SmsController.getLists);

module.exports = router;