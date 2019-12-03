import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { UserEntity } from '../db/entities/User';
import logger from '../logger';
const opts = {
 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 secretOrKey: process.env.SECRET,
};

passport.serializeUser<UserEntity, number>((user: UserEntity, done) => {
    return done(null, user.id);
});

passport.deserializeUser<UserEntity, number>(async (id, done) => {
    try {
        console.log(id);
        const user = await UserEntity.findOne({ id });
        // console.log(user);
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
        const user = await UserEntity.findOne({id: jwtPayload.sub});
        if (user) {
            done(null, user);
            return;
        } else {
            done('User not found', null);
            return;
        }
    } catch (err) {
        logger.info('fuck')
        done(err, null);
        return;
    }
}));

export default passport;
