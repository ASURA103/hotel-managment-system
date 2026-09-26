import {
  signinValidator,
  signupValidator,
} from "../../config/helper/validators.js";
import user from "../../config/schema/userschema.js";
import hotel from "../../config/schema/hotel.schema.js";
import bookings from "../../config/schema/booking.schema.js";
import { hashPassword, verifyPassword } from "../lib/passwords.js";
import { ROLES, signToken } from "../lib/tokens.js";

const withoutPassword = ({ password, ...rest } = {}) => rest;

export const Signup = async (req, res) => {
  const body = req.body;
  console.log(withoutPassword(body));
  try {
    const success = signupValidator.safeParse(body);
    if (!success.success) {
      return res.status(400).json({ msg: "Data not in format" });
    }
    const check = await user.findOne({ email: body.email }).select("_id").lean();
    if (check) {
      return res.status(401).json({ msg: "user already exists" });
    }
    const hashedPass = await hashPassword(body.password);
    const response = await user.create({
      name: body.name,
      username: body.username,
      email: body.email,
      password: hashedPass,
    });
    const token = signToken(response._id, ROLES.USER);
    res.json({
      name: response.name,
      token: token,
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(401).json({ msg: "user already exists" });
    }
    console.log("error while signup", error);
    return res.status(500).json({ msg: "error while signup" });
  }
};

export const Signin = async (req, res) => {
  const body = req.body;
  try {
    const success = signinValidator.safeParse(body);
    if (!success.success) {
      return res.status(400).json({ msg: "data not in format" });
    }
    const response = await user.findOne({
      email: body.email,
    });
    if (!response || response == null) {
      return res.status(401).json({ msg: "user not found" });
    }
    const compare = await verifyPassword(body.password, response.password);
    if (!compare) {
      return res.status(401).json({ msg: "incorrect password" });
    }
    const token = signToken(response._id, ROLES.USER);
    res.json({
      name: response.name,
      token: token,
    });

  } catch (error) {
    console.log("error while signing up", error);
    res.status(500).json({ msg: "error while signing up" });
  }
};


