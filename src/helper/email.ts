import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log( process.env.SEND_MAIL);
console.log( process.env.PASS_MAIL);

export const mailer = async (emailfrom: string, message: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SEND_MAIL!,
      pass: process.env.PASS_MAIL!,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const sendinfo = {
    from: emailfrom,
    to: process.env.SEND_MAIL,
    subject: 'This message is sent from contact form',
    html: `<b>${message}</b>`,
  };

  try {
    const sendMail = await transporter.sendMail(sendinfo);
    return sendMail;
  } catch (error:any) {
   console.log(error.message);
  }
};
