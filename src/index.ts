import express from 'express';
import config from 'config';
import cors from 'cors';
import mongoose from 'mongoose';
import contact from './routes/contact';
import user from './routes/user';
import auth from './routes/auth';

const app = express();

if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwt is not define');
  process.exit(1);
}

mongoose.connect(config.get('MONGOURI'))
  .then(() => console.log('Connected to Mongo database......'))
  .catch((err) => console.error('Could not Connect to database....', err));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/contact', contact);
app.use('/api/user/signup', user);
app.use('/api/user/signin', auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
