import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import config from 'config';
import { buildUser, User } from '../models/user';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/me', auth, async (req: any, res: any) => {
  const user = await User.findById(req.user._id).select('-password').catch((err) => err.message);

  res.send(user);
});

router.post('/', [], async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email }).catch((err) => err.message);

  if (user) return res.status(400).send('User with this Email already Exist');

  user = await User.findOne({ username: req.body.username }).catch((err) => err.message);

  if (user) return res.status(400).send('User with this username already Exist');

  user = buildUser({

    username: req.body.username,
    password: req.body.password,
    email: req.body.email

  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'email']));
});

export default router;
