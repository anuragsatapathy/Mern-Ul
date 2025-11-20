const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

// validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.register = async (payload) => {
  // validate
  const { error, value } = registerSchema.validate(payload);
  if (error) throw { status: 400, message: error.details[0].message };

  // check existing
  const existing = await User.findOne({ email: value.email });
  if (existing) throw { status: 400, message: 'Email already registered' };

  // hash password
  const hashed = await bcrypt.hash(value.password, 10);

  // create user
  const user = new User({
    name: value.name,
    email: value.email,
    password: hashed
  });

  await user.save();

  // return safe user data (no password)
  return { message: 'User registered', user: { id: user._id, name: user.name, email: user.email } };
};

exports.login = async (payload) => {
  // validate
  const { error, value } = loginSchema.validate(payload);
  if (error) throw { status: 400, message: error.details[0].message };

  // find user
  const user = await User.findOne({ email: value.email });
  if (!user) throw { status: 400, message: 'Invalid email or password' };

  // compare password
  const match = await bcrypt.compare(value.password, user.password);
  if (!match) throw { status: 400, message: 'Invalid email or password' };

  // generate token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

  return { message: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email } };
};
