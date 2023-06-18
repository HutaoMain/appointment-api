const AppointmentsModel = require("../models/AppointmentsModel");

const createAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentsModel.create(req.body);
    res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
  }
};

const getAppointmentList = async (req, res) => {
  try {
    const appointmentList = await AppointmentsModel.find();
    res.status(200).json(appointmentList);
  } catch (err) {
    console.log(err);
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await AppointmentsModel.findById(req.params.id);
    res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
  }
};

const deleteAppointmentById = async (req, res) => {
  try {
    const appointment = await AppointmentsModel.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
  }
};

const updateAppointmentById = async (req, res) => {
  try {
    const appointment = await AppointmentsModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
  }
};

const getAppointmentByEmail = async (req, res) => {
  try {
    const appointment = await AppointmentsModel.find({
      email: req.params.email,
    });
    res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createAppointment,
  getAppointmentList,
  getAppointmentById,
  deleteAppointmentById,
  updateAppointmentById,
  getAppointmentByEmail,
};
