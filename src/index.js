const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");

dotEnv.config();

const UserRouter = require("./routes/UsersRouter");
const AppointmentsRouter = require("./routes/AppointmentsRouter");
const AuthRouter = require("./routes/AuthRouter");
const passportSetup = require("./passport");

const app = express();
app.use(express.json());

app.use(cors());

app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//mongoose connection here
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

app.use("/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/appointment", AppointmentsRouter);

app.use(passport.initialize());
app.use(passport.session());

const PORT = 5000;
app.listen(PORT, () => {
  connect();
  console.log(`server is listening to port ${PORT}`);
});
