import crypto from "crypto";

import expressSession from "express-session";
import fetch from "isomorphic-fetch";
import passport from "passport";
import { Strategy } from "passport-github2";

import { env } from "decentraland-commons";

export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth");
}

export function setupAuthentication(app) {
  passport.serializeUser((username, done) => {
    done(null, username);
  });
  passport.deserializeUser((username, done) => {
    done(null, username);
  });
  passport.use(
    new Strategy(
      {
        clientID: env.get("GITHUB_CLIENT_ID"),
        clientSecret: env.get("GITHUB_CLIENT_SECRET"),
        callbackURL: env.get("GITHUB_CALLBACK_URL"),
      },
      async (_accessToken, _refreshToken, profile, done) => {
        if (
          env.get("ADMINS").split(",").includes(profile.username) ||
          (await fetch("https://api.github.com/orgs/kleros/members")
            .then((res) => res.json())
            .then((members) =>
              members.find((member) => member.login === profile.username)
            ))
        )
          done(null, profile.username);
        else done("You are not authorized to use this application.");
      }
    )
  );

  app.use(
    expressSession({
      secret: crypto.randomBytes(64).toString("hex"),
      saveUninitialized: false,
      resave: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/auth", passport.authenticate("github", { scope: ["read:user"] }));
  app.get(
    "/auth/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (_req, res) => {
      res.redirect("/");
    }
  );

  app.get("*", ensureAuthenticated);
  app.use("/alarms", ensureAuthenticated);
}
