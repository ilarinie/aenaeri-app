import express from 'express';
import path from 'path';
import { loggerMiddleWare } from '../logger/middleware';
import { handleError } from './errorHandler';
import { initializeRoutes } from './routes';
import bodyParser from 'body-parser';
const app = express();

app.use(loggerMiddleWare);
app.use(bodyParser.json());
initializeRoutes(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}


app.use(handleError);

export default app;
