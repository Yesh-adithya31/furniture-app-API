const router = require("express").Router();

const {
  getCart,
  addToCart,
  deleteCartItem,
  decrementCartItem,
} = require("../controllers/cartController");

router.get("/find/:id", getCart);
router.post("/", addToCart);
router.post("/quantity", decrementCartItem);
router.delete("/:cartItemId", deleteCartItem);

module.exports = router;
