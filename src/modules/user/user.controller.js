import userModel from "../../../db/module/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../mail/send.email.js";
import { handelError } from "../../middelware/handleAsyncErrot.js";
import { AppError } from "../../../utils/appError.js";

export const signUp = handelError(async (req, res, next) => {
  let { name, email, password } = req.body;
  let existUser = await userModel.findOne({ email });
  if (existUser) return next(new AppError(`email already exist`, 409));
  let hashedPassword = bcrypt.hashSync(
    password,
    Number(process.env.SALTED_VALUE)
  );
  let added = await userModel.insertMany({
    name,
    email,
    password: hashedPassword,
  });
  let verifyToken = jwt.sign(
    { id: added[0]._id }, // added[0]._id  =>insertMany return array
    process.env.VERIFY_SECRET_KEY
  );
  sendEmail({ email, api: `localhost://3000/api/v1/verify/${verifyToken}` });

  res.send({ message: "signUp", added });
});
export const signIn = handelError(async (req, res, next) => {
  let { email, password } = req.body;
  let existUser = await userModel.findOne({ email });

  if (existUser) {
    if (existUser.verified) {
      let isMatch = bcrypt.compareSync(password, existUser.password);
      if (isMatch) {
        let token = jwt.sign({ id: existUser._id }, process.env.SECRET_KEY);
        res.json({ message: "welcome", token });
      } else {
        next(new AppError(`wrong password`, 401));
      }
    } else {
      next(new AppError(`please verify your email first`, 401));
    }
  } else {
    next(new AppError(`u should signUp first`, 400));
  }

  res.send({ message: "signUp", added });
});

export const verifyEmail = async (req, res) => {
  let { token } = req.params;
  jwt.verify(token, process.env.VERIFY_SECRET_KEY, async (err, decoded) => {
    if (err) return res.json({ message: "token not found" });
    let updated = await userModel.findByIdAndUpdate(
      decoded.id,
      { verified: true },
      { new: true }
    );
    res.json({ message: "email verified", updated });
  });
};
