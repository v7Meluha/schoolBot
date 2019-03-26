const nodemailer = require("nodemailer");
const {
 mailContent,
 secret,
 botMail
  } = require("./lib.js")

 module.exports = async function(params) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        ssl: true,
        port: 465,
        secure: true,
        auth:{
            user: botMail,
            pass: secret
        }
    });

    let mailOptions = {
        from: botMail,
        to: params.email,
        subject: "Request to schedule a meeting",
        text: mailContent(params)
    };
    let info = await transporter.sendMail(mailOptions)
    return new Promise((resolve, reject) => {
    if (info.messageId != null) {
      console.log("success")
        resolve("Okay. I'm sending the email  requesting for a meeting with the class teacher. You will be receiving updates soon 👍😊")
    } else {
      console.log(err)
        reject(err)
    }
    })
    .then((response)=> {
        return response
    }).catch((err)=> {
        throw new Error(err)
    })

}

