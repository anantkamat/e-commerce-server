import express from "express";
const authRouter = express.Router();
import client from "../../database/db.js";
import jwt from "jsonwebtoken";
import { v6 as uuidv6 } from "uuid";

authRouter.post("/getOTP", async (req, resp) => {
  const { phone } = req.body;
  const otp = _generateOtp();
  const requestId = uuidv6();
  const expiry = new Date(Date.now() + 2 * 60000); // 2 minutes

  const res = await client.query(
    "INSERT into auth (phone, otp, expiry) values ($1, $2, $3) returning *",
    [phone, otp, expiry]
  );

  resp.json({
    requestId: requestId,
    expiry: expiry,
  });
});

// generates a 6 digit OTP with no leading zero
const _generateOtp = () => {
  const otpLength = 6;
  let otp = "";
  let random;

  do {
    random = Math.floor(Math.random() * 10);
    if ((otp === "" && random !== 0) || otp !== "") {
      otp += random;
    }
  } while (otp.length < otpLength);

  return otp;
};

export { requireSignin };
