import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../managers/dao/db/models/user.model';
import SessionModel from '../managers/dao/db/models/session.model';
import { PRIVATE_KEY } from '../path.js';


const router = express.Router();

    //! Estrategia de autenticación local
router.post('/login', async (req, res) => {
  try {
    const user = await performLocalAuthentication(req.body.username, req.body.password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //! Crear nueva sesión
    const session = new SessionModel({
      userId: user._id,
    });
    await session.save();

    //! Generar token JWT
    const token = jwt.sign({ user, session }, PRIVATE_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

    //! Autenticación con JWT
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

    //! obtener el usuario actual
router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { session } = req.user;

    if (!session) {
      return res.status(401).json({ message: 'No active session for the user.' });
    }

    const user = await User.findById(session.userId);
    if (!user) {
      return res.status(401).json({ message: 'User associated with the session not found.' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

    //! Autenticación local
async function performLocalAuthentication(username, password) {
  const user = await User.findOne({ username });

  if (!user) {
    return null;
  }

    //! Verificar la contraseña
  const isPasswordValid = user.comparePassword(password);

  if (!isPasswordValid) {
    return null;
  }
  return user;
}

export default router;