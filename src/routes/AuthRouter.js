const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `/login`,
  }),
  function (req, res) {
    const redirectUrl = `${process.env.CLIENT_URL}?email=${req.user.email}`;
    console.log(req.user.email);
    res.redirect(redirectUrl);
  }
);

module.exports = router;
