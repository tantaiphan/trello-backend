/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Routes from './router/index';
import passport from './config/github-config';
import session from 'express-session';
import { envConfig } from './config/env-config';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(
  session({
    secret: envConfig.sessionSecretKey || "",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', Routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
