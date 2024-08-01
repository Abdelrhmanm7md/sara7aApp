import messageModel from "../../../db/module/message.model.js";
import { sendEmail } from "../../mail/send.email.js";
import { handelError } from "../../middelware/handleAsyncErrot.js";
export const addMessage = handelError(async (req, res) => {
  let { messageText, receivedId } = req.body;
  let isexits = await messageModel.findById({ receivedId });
  if (!isexits) return res.json({ message: "user not found" });
  let addedmessage = await messageModel.insertMany({
    messageText,
    receivedId,
  });

  res.json({ message: "add message", addedmessage });
});

export const getMessages = handelError(async (req, res) => {
  sendEmail();
  let messages = await messageModel.find({ receivedId: req.userId });
  res.json({ message: "get messages", messages });
});
