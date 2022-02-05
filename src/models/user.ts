import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  username: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true }

});

const User = mongoose.model('User', userSchema);

interface IUser {
    username: string,
    password: string,
    email: string
}

const buildUser = (attr: IUser) => new User(attr);

export { buildUser, User, IUser };
