import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import path from 'path';
import passport from '../auth/passport';
import { loggerMiddleWare } from '../logger/middleware';
import { handleError } from './errorHandler';
import { initializeRoutes } from './routes';
import cookieSession from 'cookie-session';

const app = express();

const corsOptions: CorsOptions = {
    origin: true,
    allowedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
};

app.use(loggerMiddleWare);
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'sessioncookie',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET as string]
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

initializeRoutes(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

app.use(handleError);

export default app;
