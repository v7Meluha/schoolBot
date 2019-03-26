const nodemailer = require("nodemailer");
//const { Content } = require("./lib.js")

 module.exports = async function(params) {
  console.log("inside")
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        ssl: true,
        port: 465,
        secure: true,
        auth: {
        user: 'donnapaulson73@gmail.com',
        pass: 'skcript@123'
        }
    });

    let mailOptions = {
        from: '"Donna Paulson" <donnapaulson73@gmail.com>',
        to: "varshu.md@gmail.com",
        subject: "Application form for School",
        text: "Hi,\n Please find attached the application form. \n Sent by @bot"
         attachments: [
        {  
            filename: 'boris.jpg',
            path: '/home/varsha/boris.jpg'
        }]
    };
    let info = await transporter.sendMail(mailOptions)
    return new Promise((resolve, reject) => {
    if (info.messageId != null) {
      console.log("success")
        resolve("Okay. I'm sending the email  requesting for a meeting with the class teacher. You will  be receiving updates soon 👍😊")
    } else{
      console.log("error")
        reject(err)
    }
    })
    .then((response)=> {
      return response
    }).catch((err) => {
  throw new Error(err)
})

}

