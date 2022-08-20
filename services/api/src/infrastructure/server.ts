import {Application} from 'express';
import unionBotRoute from '../routes/unionBotRoute';
import helmet from 'helmet';

export const PORT: number = Number(process.env.API_PORT) || 3000;

export const setupServer = async (app: Application) => {
    app.use(helmet());

    app.use('/', unionBotRoute);

    console.log(`node env ${process.env.NODE_ENV}`);
};
