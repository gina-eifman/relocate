const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const { signup, signin } = require('../controllers/auth');
const NotFoundError = require('../errors/NotFoundError');
const { validateSignUp, validateSignIn } = require('../middlewares/validation');
const collectionRouter = require('./collections');
const favouriteRouter = require('./favourites');
const categoryRouter = require('./categories');
const countryRouter = require('./countries');
const { BAD_REQUEST_ERR, UNAUTHORIZED_ERR, FORBIDDEN_ERR, NOT_FOUND_ERR, CONFLICT_ERR, AVATAR_ERR, INTERNAL_SERVER_ERR } = require('../utils/constants');

router.post('/sign-up', validateSignUp, signup);
router.post('/sign-in', validateSignIn, signin);
router.use('/users', auth, userRouter);
router.use('/collections', auth, collectionRouter);
router.use('/favourites', auth, favouriteRouter);
router.use('/categories', categoryRouter);
router.use('/countries', countryRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Page does not exist'));
});

module.exports = router;