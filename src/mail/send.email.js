import nodemalier from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";

export async function sendEmail (option){

    const transprort = nodemalier.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    })


    const info = await transprort.sendMail({
        from: process.env.EMAIL,
        to: option.email,
        subject: "sara7a",
        text: "hello this is sara7a",
        html: emailTemplate(option.api),
    })
}