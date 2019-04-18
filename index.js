import dotenv from 'dotenv';
import express from 'express';
import locationRouter from './api/location';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use('/api/location/', locationRouter);
app.use(express.static('public'));

app.use(express.static('public'));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});