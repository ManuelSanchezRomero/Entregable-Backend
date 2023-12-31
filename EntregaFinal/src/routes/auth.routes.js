import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../managers/dao/db/models/user.model';
import SessionModel from '../managers/dao/db/models/session.model';
import { PRIVATE_KEY } from '../path.js';
import { sendResetPasswordEmail } from '../config/utils/email.utils.js';


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

  //detector de premiun/user
  if (user.role === 'premium') {
    res.json({ user, message: 'Bienvenido usuario premium' });
  } else {
    res.json({ user, message: 'Bienvenido usuario estándar' });
  }



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

    //! Recuperar la contraseña
router.post('/forgot-password', async (req, res) => {

  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const resetToken = jwt.sign({ userId: user._id }, PRIVATE_KEY, { expiresIn: '1h' });

    await sendResetPasswordEmail(user, resetToken);

    res.status(200).json({ message: 'Correo enviado con éxito.' });
  } catch (error) {
    console.error('Error en forgotPassword:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

export default router;