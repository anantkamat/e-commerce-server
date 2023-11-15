import express from "express";
const userRouter = express.Router();
import client from "../../database/db.js";
import { requireSignin } from "../Auth/interface.js";

userRouter.get("/", requireSignin, async (req, response) => {
  const res = await client.query("SELECT * FROM users");
  response.json(res.rows);
});

userRouter.post("/", async (req, resp) => {
  const { name, email, phone } = req.body;
  const res = await client.query(
    "INSERT into users (name, email, phone) values ($1, $2, $3) returning *",
    [name, email, phone]
  );

  resp.json(res.rows[0]);
});

userRouter.patch("/:id", async (req, resp) => {
  const keys = Object.keys(req.body);
  const values = [];

  const setter = keys.map((key, index) => {
    values.push(req.body[key]);
    return `${key}=$${index + 1}`;
  });

  const res = await client.query(
    `UPDATE users SET ${setter.join(",")} WHERE id=$${
      keys.length + 1
    } returning *`,
    [...values, req.params.id]
  );
  resp.json(res.rows[0]);
});

export default userRouter;
