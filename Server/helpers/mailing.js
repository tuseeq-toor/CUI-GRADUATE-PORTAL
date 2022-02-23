// const nodemailer = require("nodemailer");

// var smtpConfig = {
//   service: "Gmail",

//   logger: true,
//   debug: true,
//   connectionTimeout: 30000,
//   auth: {
//     user: "tuseeqtoor9@gmail.com",
//     pass: "forgoti@gg",
//   },
//   tls: {
//     rejectUnAuthorized: false,
//   },
// };

// var transporter = nodemailer.createTransport(smtpConfig);
// transporter.sendMail(
//   {
//     from: "tuseeqtoor9@gmail.com",
//     to: "tuseeqtoor9@gmail.com",
//     subject: "ABC",
//     text: "EHll",
//   },
//   (err, info) => {
//     if (err) console.log(err);
//     else console.log(info);
//   }
// );
// transporter.verify((err, success) => {
//   if (err) console.error(err);
//   console.log("Your config is correct");
// });
// console.log(transporter.options.host);
// create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//   host: "smtp.dreamhost.com",
//   port: 465,
//   //   host: "smtp.gmail.com",
//   //   port: 587,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: "developer@professionalware.tech", // generated ethereal user
//     pass: "pwt@mail.com", // generated ethereal password
//   },
// });

// send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "tuseeqtoor9@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

// console.log("Message sent: %s", info.messageId);
// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// // Preview only available when sending through an Ethereal account
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
