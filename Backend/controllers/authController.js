const jwt = require('jsonwebtoken');
const db = require('../database/models');
const secret = 'procureitor-secret-key';

const authController = {
  me: async (req, res) => {
    try {
      if (!req.auth || !req.auth.Iniciales) {
        return res.status(401).json({ error: 'Unauthorized: No user data in token' });
      }

      const miembro = await db.Miembro.findOne({ where: { Iniciales: req.auth.Iniciales } });
      console.log('Found miembro:', miembro ? miembro.dataValues : 'Not found');

      if (!miembro) {
        return res.status(404).json({ error: 'User not found in database' });
      }

      res.json({
        Iniciales: miembro.Iniciales,
        nombre: miembro.Name || 'Unnamed', // Fallback if nombre is missing
        nivel_acceso: miembro.nivel_acceso,
        avatar: miembro.avatar || null
      });
    } catch (error) {
      console.error('Error in /auth/me:', error.message, error.stack);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  },

  login: async (req, res) => {
    try {
      console.log('Login attempt:', req.body);
      const { usuario, password } = req.body;
      const miembro = await db.Miembro.findOne({ where: { usuario } });
      if (!miembro || !(await miembro.validPassword(password))) {
        console.log('Login failed for:', Iniciales);
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { Iniciales: miembro.Iniciales, miemID: miembro.miemID },
        'procureitor-secret-key',
        { expiresIn: '1h' , algorithm: 'HS256'}
      );
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = authController;