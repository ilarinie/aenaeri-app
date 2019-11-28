import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { UserEntity } from '../db/entities/User';
const opts = {
 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 secretOrKey: process.env.SECRET,
};

passport.serializeUser<UserEntity, number>((user: UserEntity, done) => {
    return done(null, user.id);
});

passport.deserializeUser<UserEntity, number>(async (id, done) => {
    try {
        const user = await UserEntity.findOneOrFail(id);
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
        const user = await UserEntity.findOne({id: jwtPayload.sub});
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;
