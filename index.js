import express from "express";
import userRouter from "./Users/index.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import client from "./database/db.js";

const app = express();
app.use([
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true,
  }),
  morgan("combined"),
]);

app.use("/users", userRouter);

app.listen("8000", () => {
  console.log("app is running");
});

app.get("/", (req, response) => {
  console.warn("hitting");
  response.json({
    message: "check",
  });
});
