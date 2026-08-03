const { PORT = 5000 } = process.env;
const { MONGO_URL = 'mongodb+srv://gina_eifman:<db_password>@cluster0.xg7nlpx.mongodb.net/relocatedb' } = process.env;
const { JWT_SECRET = 'secretkey' } = process.env;

module.exports = {
  PORT,
  MONGO_URL,
  JWT_SECRET,
};