import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import { envConfig } from './env-config';

dotenv.config();

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((obj: any, done) => done(null, obj));

passport.use(
  new GitHubStrategy(
    {
      clientID: envConfig.githubClientId || '',
      clientSecret: envConfig.githubClientSecretKey || '',
      callbackURL:envConfig.githubCallbackUrl || '',
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      return done(null, { profile, accessToken });
    }
  )
);

export default passport;
