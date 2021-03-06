import './db';
import dotenv from 'dotenv';
import express from 'express';
import locationRouter from './api/location';
import characterRouter from './api/character';
import bodyParser from 'body-parser';

dotenv.config();

export const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api/character', characterRouter);
app.use('/api/location/', locationRouter);
app.use(express.static('public'));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});