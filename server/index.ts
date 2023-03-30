import express, { Express } from 'express';
import { DotenvConfigOptions } from 'dotenv';
import cors from 'cors';
import { boardsRouter } from './routes/boardsRouter';

const app: Express = express();

app.use(cors());

app.use(express.urlencoded({extended: false}));

app.use(express.json());

const PORT:string | number = process.env.PORT || 4001;

app.listen(PORT);