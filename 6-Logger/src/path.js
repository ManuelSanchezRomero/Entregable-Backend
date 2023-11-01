import {dirname} from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const crypto = require('crypto');

export const PRIVATE_KEY = crypto.randomBytes(32).toString('hex');
console.log('PRIVATE_KEY:', PRIVATE_KEY);

export default __dirname;