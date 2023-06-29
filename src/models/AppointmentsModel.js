const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    appointmentDate: {
      type: String,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    inquiryMessage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    email: {
      type: String,
      required: true,
    },
    // notifications
    adminNotification: {
      type: Boolean,
      default: true,
    },
    adminMarkAsRead: {
      type: Boolean,
      default: false,
    },
    userNotification: {
      type: Boolean,
      default: false,
    },
    userMarkAsRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointments", AppointmentSchema);
