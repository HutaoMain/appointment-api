const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
      const existingUser = await UsersModel.findOne({
        email: profile.emails[0].value,
      });

      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = new UsersModel({
          fullname: profile.displayName,
          email: profile.emails[0].value,
        });
        await newUser.save();

        done(null, newUser);
      }
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
