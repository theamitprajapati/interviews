var router = require('express').Router();
const ContactController = require('../controllers/ContactController');
router.post('/contact/add', ContactController.add);
router.get('/contact/details/:phone', ContactController.details);
router.get('/contact/list', ContactController.list);
router.post('/message/send', ContactController.sendMessage);
router.get('/message/list', ContactController.listMessage);
module.exports = router;