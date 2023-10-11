const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRouter = require("./routes/products");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const ordersRouter = require("./routes/order");
const cartRouter = require("./routes/cart");

const app = express();
const port = 3000;

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!!");
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/", authRouter);   
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", ordersRouter);


app.get("/", (req, res) => res.send("This Furniture Application API!"));
app.listen(process.env.PORT || port, () =>
  console.log(`Furniture app listening on port ${process.env.PORT || port}!`)
);
