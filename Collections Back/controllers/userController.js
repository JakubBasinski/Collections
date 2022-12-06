import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res, next) => {
  const isUser = await User.findOne({ email: req.body.email });
  if (isUser) {
    return res.status(409).json({ message: 'User already exists' });
  } else {
    let isAdmin = false;
    if (req.body.name === 'admin') {
      isAdmin = true;
    }
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        isAdmin: isAdmin,
      });
      user
        .save()
        .then((result) => {
          res
            .status(200)
            .json({ message: 'Success! Please login to continue' });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    });
  }
};



export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(500).json({ message: 'User not found !' });
      return;
    }
    const password = await bcrypt.compare(req.body.password, user.password);
    if (password) {
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        'secret',
        {
          expiresIn: '1h',
        }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600000,
        userId: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(500).json({ message: 'Password incorrect' });
    }
  } catch (err) {
    console.log(err);
  }
};
