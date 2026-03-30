const nodemailer = require("nodemailer");

function buildOtpHtml(otp) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; background: #0a0a0f; color: #fff; border-radius: 12px;">
      <h2 style="color: #00ff88; text-align: center;">SecureChat</h2>
      <p>Your one-time password is:</p>
      <div style="background: #1a1a2e; padding: 20px; border-radius: 8px; text-align: center;">
        <h1 style="color: #00ff88; letter-spacing: 8px; font-size: 36px; margin: 0;">${otp}</h1>
      </div>
      <p style="color: #666; font-size: 12px;">This OTP expires in 5 minutes. Do not share it.</p>
    </div>
  `;
}

const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Mandatory for Render
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"SecureChat" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your SecureChat OTP Code",
      html: buildOtpHtml(otp),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully via Gmail:", info.messageId);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Email delivery failed");
  }
};

module.exports = sendEmail;