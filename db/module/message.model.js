import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema(
  {
    messageText: {
      type: String,
      minLength: [3, "name is too short"],
      required: true,
    },
    receivedId: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = model("Message", messageSchema);

export default messageModel;
