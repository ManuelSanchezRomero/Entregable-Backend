import User from '../managers/dao/db/models/user.model';
import multer from 'multer';

class UserController {
  static async uploadDocuments(req, res) {
    try {
      const { uid } = req.params;
      const user = await User.findById(uid);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      await user.save();
      res.json({ message: 'Documentos subidos con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al procesar la subida de documentos' });
    }
  }

  static async updateToPremium(req, res) {
    try {
      const { uid } = req.params;
      const user = await User.findById(uid);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (!UserController.areDocumentsUploaded(user)) {
        return res.status(400).json({ message: 'El usuario no ha completado la carga de documentos necesarios' });
      }
      user.role = 'premium';

      await user.save();

      res.json({ message: 'Usuario actualizado a premium con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar a premium' });
    }
  }

  static areDocumentsUploaded(user) {
    return user.documents && user.documents.length > 0;
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find({}, 'first_name last_name email role');
  
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }

  static clearInactiveUsers = async (req, res) => {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
      await User.deleteMany({ last_connection: { $lt: twoDaysAgo } });
  
      //! Enviar correos
  
      res.json({ message: 'Usuarios inactivos eliminados con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al limpiar usuarios inactivos' });
    }
  };


}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationFolder = ''; 
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export const uploadDocuments = upload.array('documents', 5, UserController.uploadDocuments);
export default UserController;
