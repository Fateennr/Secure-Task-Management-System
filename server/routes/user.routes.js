const router = require('express').Router();
const UserServices = require('../services/users.services');

router.post('/register', UserServices.register);
router.post('/login', UserServices.login);

module.exports = router;
