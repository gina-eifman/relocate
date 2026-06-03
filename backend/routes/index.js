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

router.post('/sign-up', validateSignUp, signup);
router.post('/sign-in', validateSignIn, signin);
router.use('/users', auth, userRouter);
router.use('/collections', auth, collectionRouter);
router.use('/favourites', auth, favouriteRouter);
router.use('/categories', categoryRouter);
router.use('/countries', countryRouter);
router.use((req, res, next) => {
  next(new NotFoundError('page does not exist'));
});

module.exports = router;