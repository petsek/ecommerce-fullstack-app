const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const { User } = require('../models/user');
const genAuthToken = require('../utils/genAuthToken');

const router = express.Router();

router.post('/login', async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email');

  const isValid = await bcrypt.compare(req.body.password, user.password)
  if (!isValid) return res.status(400).send('Invalid password');

  const token = genAuthToken(user);

  res.send(token);
});

router.post('/register', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User already exist');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  user = await user.save()

  const token = genAuthToken(user);

  res.send(token);
});


router.put('/updateUser', async (req, res) => {

  try {
    const { currentPassword, newName, newPassword1, newPassword2 } = req.body;
    if (newPassword1 != newPassword2) return res.status(400).send('New password is not identical');

    const schema = Joi.object({
      newName: Joi.string().min(3).max(30).required(),
      currentPassword: Joi.string().required(),
      newPassword1: Joi.string().min(6).max(200).required(),
      newPassword2: Joi.string().min(6).max(200).required(),
      email: Joi.string().min(3).max(200).required().email(),
    });

    // const { error } = schema.validate(req.body)
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email');

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) return res.status(400).send('Invalid current password');

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword2, salt)

    updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: { name: req.body.newName, password: hashedPassword }
      }
    )

    const token = genAuthToken(updatedUser);

    res.send(token);

  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;