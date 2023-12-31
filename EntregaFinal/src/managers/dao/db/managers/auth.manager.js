import User from "../models/user.model";
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
  const { first_name, last_name, email, age, password, role} = req.body;

  try {
    const user = new User({
      first_name,
      last_name,
      email,
      age,
      password,
      cart: null,
      role: role || 'user',
    });

    await user.save();
    res.json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    //! Generar token para restablecer contraseña
    const resetToken = jwt.sign({ userId: user._id }, 'tu_secreto', { expiresIn: '1h' });


    res.status(200).json({ message: 'Correo enviado con éxito.' });
  } catch (error) {
    console.error('Error en forgotPassword:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


export default { registerUser , forgotPassword };