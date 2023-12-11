import express from 'express';
import UserController from '../managers/dao/db/managers/user.manager';

const router = express.Router();

router.post('/:uid/documents', UserController.uploadDocuments);

export default router;