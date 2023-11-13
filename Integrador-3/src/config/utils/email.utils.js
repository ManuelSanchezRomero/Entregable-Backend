
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
});

const sendResetPasswordEmail = async (user, token) => {
  const resetLink = `http://ACOMODARESTO/${token}`;

  const mailOptions = {
    from: 'manuel.sromero@outlook.com',
    to: user.email,
    subject: 'Restablecer Contraseña',
    text: `Hola ${user.first_name}, haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

export { sendResetPasswordEmail };
