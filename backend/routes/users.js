const router = require('express').Router();
const { getProfileInfo, getAvatar, editProfileInfo } = require('../controllers/users');
const { initUpload } = require('../middlewares/upload');
const { validateEditProfileInfo } = require('../middlewares/validation');

router.get('/me', getProfileInfo);
router.get('/avatar/:id', getAvatar);
router.patch('/me', upload.single('avatar'), editProfileInfo);

module.exports = router;