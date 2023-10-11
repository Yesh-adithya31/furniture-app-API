const router = require("express").Router();
const { deleteUser, getUser } = require("../controllers/userController");

router.delete("/:id", deleteUser);
router.get("/:id", getUser);

module.exports = router;
