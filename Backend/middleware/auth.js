const { expressjwt: jwt } = require('express-jwt');

const authMiddleware = jwt({
  secret: 'procureitor-secret-key',
  algorithms: ['HS256'],
  clockTolerance: 10800, // 3 hours in seconds

  getToken: (req) => {
    const authHeader = req.headers.authorization;
    console.log('Middleware: Authorization header:', authHeader);
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      console.log('Middleware: Token extracted:', token);
      return token;
    }
    console.log('Middleware: No valid Bearer token found');
    return null;
  }
});

module.exports = authMiddleware;