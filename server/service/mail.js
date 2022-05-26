import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alexander.frenkii@gmail.com",
    pass: "ktrsxoqxidgcsrhk",
  },
});

async function sendActivationMail(to, link) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: "Активація аккаунта",
    text: "",
    html: `
                  <div>
                      <h1>Для активації перейдіть за посиланням</h1>
                      <a href="${link}">${link}</a>
                  </div>
              `,
  });
}

export { sendActivationMail };
