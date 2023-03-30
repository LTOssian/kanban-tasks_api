import express, { Express } from 'express';
import * as dotenv from "dotenv";
import cors from 'cors';
import { boardsRouter } from './routes/boardsRouter';

dotenv.config()

const app: Express = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/boards', boardsRouter);

const PORT:string | number = process.env.PORT || 3000;
app.listen(PORT);