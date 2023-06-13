const router = require("express").Router();
const UsersController = require("../controllers/UsersController");

router.post("/register", UsersController.registerUser);
router.post("/login", UsersController.loginUser);
router.get("/:email", UsersController.getSpecificUserByEmail);

module.exports = router;
