const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require("cors");

dotEnv.config();

const UserRouter = require("./routes/UsersRouter");
const AppointmentsRouter = require("./routes/AppointmentsRouter");

const app = express();
app.use(express.json());

app.use(cors());

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

app.use("/api/user", UserRouter);
app.use("/api/appointment", AppointmentsRouter);

const PORT = 5000;
app.listen(PORT, () => {
  connect();
  console.log(`server is listening to port ${PORT}`);
});
