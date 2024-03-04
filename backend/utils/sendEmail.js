import nodemailer from 'nodemailer'

const sendEmail = async (options) => {

  let transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'ashutoshdikondwar17@gmail.com',
      user: process.env.SMTP_MAIL,
      // pass: 'bgpkpyggvamhmbdb'
      pass: process.env.SMTP_PASSWORD
    },

  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(mailOptions);
};

export default sendEmail