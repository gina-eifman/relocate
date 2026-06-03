const router = require('express').Router();
const { getProfileInfo, editProfileInfo } = require('../controllers/users');
const { validateEditProfileInfo } = require('../middlewares/validation');

router.get('/me', getProfileInfo);
router.patch('/me', validateEditProfileInfo, editProfileInfo);

module.exports = router;