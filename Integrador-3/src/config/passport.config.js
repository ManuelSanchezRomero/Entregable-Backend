import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwtStrategy from 'passport-jwt';
import { PRIVATE_KEY } from '../path.js';
import User from '../managers/dao/db/models/user.model';
import bcrypt from 'bcrypt';

const LocalStrategy = localStrategy.Strategy;
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
  // Estrategia para autenticación con usuario y contraseña
  passport.use('local', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: 'Incorrect email.' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return done(null, false, { message: 'Incorrect password.' });

        return done(null, user, { message: 'Logged in successfully.' });
      } catch (error) {
        return done(error);
      }
    }
  ));

  // Estrategia de obtener Token JWT por Cookie
  passport.use('jwt', new JwtStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
      try {
        // Puedes validar el token y extraer el usuario correspondiente
        // Por simplicidad, devolveremos directamente el payload del token
        return done(null, jwt_payload);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  ));

  // Funciones de Serialización y Deserialización
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      return done(null, id);
    } catch (error) {
      console.error('Error deserializing user: ' + error);
      return done(error);
    }
  });
};

export default initializePassport;