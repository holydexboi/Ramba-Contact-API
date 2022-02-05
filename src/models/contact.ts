import mongoose from 'mongoose';

interface IContact {

    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    user: string
}

const Contact = mongoose.model('Contact', new mongoose.Schema({

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}));

const buildContact = (attr: IContact) => new Contact(attr);

export { buildContact, Contact };
