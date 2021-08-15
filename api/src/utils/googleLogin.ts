import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";
import { Express } from "express";
import { User } from "../models/User";

export const googleLogin = ({ app }: { app: Express }) => {
  const verifyCallback = async (
    __: any,
    _: any,
    profile: any,
    done: Function
  ) => {
    const email = profile.emails[0].value;
    const avatar = profile.photos[0].value;

    let user = await User.findOne({
      where: { googleId: profile.id },
    });

    if (!user) {
      user = await User.create({
        email,
        googleId: profile.id,
        avatar,
      }).save();
    }

    done(null, { userId: user.id });
  };

  passport.use(
    new OAuth2Strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: `${
          process.env.NODE_ENV === "production"
            ? process.env.API_URL
            : "http://localhost:4000"
        }/oauth2callback`,
      },
      verifyCallback
    )
  );

  passport.serializeUser((user: any, done: Function) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: any) => {
    const user = await User.findOne(id);
    if (!user) {
      done(null, {});
    } else {
      done(null, user);
    }
  });

  app.use(passport.initialize());

  app.get(
    "/oauth2google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
      prompt: "select_account",
    })
  );

  app.get(
    "/oauth2callback",
    passport.authenticate("google", {
      session: false,
    }),
    (req, res) => {
      req.session.userId = (req.user as any).userId;

      res.redirect(
        307,
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_URL
          : "http://localhost:3000"
      );
    }
  );
};
