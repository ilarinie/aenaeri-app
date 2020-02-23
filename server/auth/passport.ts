import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { UserEntity } from '../db/entities/User';
import passportLocal from 'passport-local';
import logger from '../logger';
const opts = {
 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 secretOrKey: process.env.SECRET,
};

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user: UserEntity, done) => {
    return done(undefined, user.id);
});

passport.deserializeUser<any, any>(async (id, done) => {
    UserEntity.findOneOrFail(id).then((user) => {
        return done(undefined, user);
    }, (err) => {
        return done(err);
    })
});

passport.use(new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
    UserEntity.findOneOrFail({ username: username }).then((user) => {
        user.comparePassword(password).then((isMatch) => {
            if (isMatch) {
                return  done(undefined, user);
            } else {
                return done(undefined, false, { message: 'Invalid username or password'})
            }
        })
    }, (err) => {
        return done(undefined, false, { message: 'Invalid username or password'})
    })
  }));
  

// passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
//     try {
//         const user = await UserEntity.findOne({id: jwtPayload.sub});
//         if (user) {
//             done(null, user);
//             return;
//         } else {
//             done('User not found', null);
//             return;
//         }
//     } catch (err) {
//         logger.info('fuck');
//         done(err, null);
//         return;
//     }
// }));

export default passport;
