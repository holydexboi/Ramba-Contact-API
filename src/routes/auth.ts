import expresss from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '../models/user';

const router = expresss.Router();

router.post('/', async (req: any, res: any) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Invalid username or password');

  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) return res.status(400).send('Invalid username or password');

  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

  res.header('x-auth-token', token).send('Ok');
});

export default router;
