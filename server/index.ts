import express, { Express, Response, Request, NextFunction, ErrorRequestHandler } from 'express';
import * as dotenv from "dotenv";
import cors from 'cors';
import { boardsRouter } from './routes/boardsRouter';
import morgan from 'morgan';

dotenv.config()

const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json");
    next();
})
app.use('/api/boards', boardsRouter);

const PORT:string | number = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});