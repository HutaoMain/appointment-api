const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const UsersModel = require("./models/UsersModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      await UsersModel.findOne({ email: profile.email }).then(
        (existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new UsersModel({
              fullname: profile.displayName,
              email: profile.emails[0].value,
            })
              .save()
              .then((user) => done(null, user));
          }
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UsersModel.findById(id).then((user) => {
    done(null, user);
  });
});
