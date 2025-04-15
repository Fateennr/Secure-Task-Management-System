const router = require('express').Router();
const UserServices = require('../services/users.services');
const auth = require('../middlewares/auth');

router.post('/register', UserServices.register);
router.post('/login', UserServices.login);

router.get('/verify', auth, (req, res) => {
    res.json({ message: 'Authenticated' });
}); // verifying the protected routes

module.exports = router;
