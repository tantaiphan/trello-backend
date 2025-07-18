import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import indexRoutes from './router/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', indexRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
