import express, { Request, Response } from 'express';
import auth from '../middleware/auth';
import { buildContact, Contact } from '../models/contact';

const router = express.Router();

router.get('/', [auth], async (req: any, res: any) => {
  const userId = req.user._id;
  const contacts = await Contact.find({ user: userId }).catch((err) => console.log(err.message));
  res.send(contacts);
});

router.get('/:id', [auth], async (req: any, res: any) => {
  const contact = await Contact.findOne()
    .and([{ _id: req.params.id }, { user: req.user._id }])
    .catch((err) => console.log(err.message));

  if (!contact) res.status(404).send('No Contact with the given ID');

  res.send(contact);
});

router.post('/', [auth], async (req: any, res: any) => {
  const contact = buildContact({

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    user: req.user._id
  });

  await contact.save();

  res.send(contact);
});

router.put('/:id', [auth], async (req: any, res: any) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, {

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    user: req.user._id

  }, { new: true })
    .and([{ _id: req.params.id }, { user: req.user._id }])
    .catch((err) => console.log(err.message));

  if (!contact) res.status(404).send('No Contact with the given ID');

  res.send(contact);
});

router.delete('/:id', [auth], async (req: any, res: any) => {
  const contact = await Contact.findByIdAndRemove(req.params.id,)
    .and([{ _id: req.params.id }, { user: req.user._id }])
    .catch((err) => console.log(err.message));

  if (!contact) res.status(404).send('No Contact with the given ID');

  res.send(contact);
});

export default router;
