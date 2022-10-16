var router = require('express').Router();
const ContactController = require('../controllers/ContactController');
router.get('/contact/add', ContactController.add);
router.get('/contact/details/:phone', ContactController.details);
router.get('/contact/list', ContactController.list);
router.post('/token/send', ContactController.sendToken);
router.get('/token/list', ContactController.listToken);
module.exports = router;