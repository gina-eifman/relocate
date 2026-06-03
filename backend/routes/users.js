const router = require('express').Router();
const { getProfileInfo, getAvatar, editProfileInfo } = require('../controllers/users');
const { initUpload } = require('../middlewares/upload');
const { validateEditProfileInfo } = require('../middlewares/validation');

router.get('/me', getProfileInfo);
router.get('/avatar/:id', getAvatar);
router.patch('/me', (req, res, next) => {
  const upload = initUpload();
  return upload.single('avatar')(req, res, next);
}, validateEditProfileInfo, editProfileInfo);

module.exports = router;