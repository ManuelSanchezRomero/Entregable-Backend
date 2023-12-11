import supertest from 'supertest';
import chai from 'chai';
import app from '../src/server.js'; 

global.expect = chai.expect;
global.request = supertest(app);