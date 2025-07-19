import express from 'express';
import { loginCallback } from './auth.service';
import passport from '../../config/github-config';

const authController = express.Router();

authController.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

authController.get(
  '/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  loginCallback
);

export default authController;
