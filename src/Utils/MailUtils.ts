import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
// import { MAIL_PASS, MAIL_USER } from '../Helper/Core/Config'
dotenv.config({})

interface MailSenderParams {
  subject: string
  html: string
  to: string
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  requireTLS: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: "<username enter ex:hello@gmail.com>",
    pass: "<pass key enter ex:rgldsvpynwqgtpia>", 
  },
})

export const mailSender = async (details: MailSenderParams) => {
  await transporter.sendMail({
    // from: MAIL_USER,
    to: details.to,
    subject: details.subject,
    html: details.html,
  })
}
