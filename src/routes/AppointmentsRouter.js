const router = require("express").Router();
const AppointmentsController = require("../controllers/AppointmentsController");

router.post("/create", AppointmentsController.createAppointment);

router.get("/list", AppointmentsController.getAppointmentList);

router.get("/:id", AppointmentsController.getAppointmentById);

router.delete("/delete/:id", AppointmentsController.deleteAppointmentById);

router.put("/update/:id", AppointmentsController.updateAppointmentById);

router.get("/email/:email", AppointmentsController.getAppointmentByEmail);

module.exports = router;
