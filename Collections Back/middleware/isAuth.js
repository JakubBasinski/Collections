import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decodedToken = jwt.verify(token, 'secret');
      req.Userdata = { email: decodedToken.email, userId: decodedToken.userId };
      next();
    } else {
      res.status(409).redirect('/auth');
    }
  } catch (err) {
    console.log(err);
  }
};

export default isAuth;
