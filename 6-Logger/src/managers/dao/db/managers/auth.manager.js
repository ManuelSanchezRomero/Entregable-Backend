import User from "../models/user.model";

const registerUser = async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    const user = new User({
      first_name,
      last_name,
      email,
      age,
      password,
      cart: null
    });

    await user.save();
    res.json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export default { registerUser };