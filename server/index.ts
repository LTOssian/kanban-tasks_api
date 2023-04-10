import express, { Express, Response, Request, NextFunction } from 'express';
import * as dotenv from "dotenv";
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from './routes/userRouter';

dotenv.config()

const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json");
    next();
})
app.use('/api/v1/user', userRouter);

const PORT:string | number = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server listening on http://${process.env.DB_HOST}:${PORT}`);
});
