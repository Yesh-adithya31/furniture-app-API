const router = require("express").Router();
const { loginUser, createUser } = require("../controllers/authController");

router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
