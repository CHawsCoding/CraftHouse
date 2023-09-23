const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Middleware function to authenticate requests
  authMiddleware: function ({ req }) {
    // Get the authorization token from the request headers
    const token = req.headers.authorization || '';

    // If there's no token, return an error
    if (!token) {
      return { user: null };
    }

    // Verify the token and get user data out of it
    try {
      const { data } = jwt.verify(token.replace('Bearer ', ''), secret, { maxAge: expiration });
      return { user: data };
    } catch {
      return { user: null };
    }
  },
  // Function to sign a token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
