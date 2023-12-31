import express from 'express';
import logger from '../config/logger';

const router = express.Router();

router.get('/loggerTest', (req, res) => {
  logger.debug('Mensaje de prueba de nivel debug');
  logger.http('Mensaje de prueba de nivel http');
  logger.info('Mensaje de prueba de nivel info');
  logger.warning('Mensaje de prueba de nivel warning');
  logger.error('Mensaje de prueba de nivel error');
  logger.fatal('Mensaje de prueba de nivel fatal');
  res.send('Pruebas de registro realizadas.');
});

export default router;
