const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport(
    {
        service: "hotmail",
        auth: {
            user: "loehe-band@live.de",
            pass: "Fische7978707!"
        }
    }
);

const opt = {
    from: "loehe-band@live.de",
    to:  "loehe-band@live.de",
    subject: "Das ist ein Test",
    text: "lalaal hier steht viel Text über Elina und Josua"
};



const mail = (message, subject) => {

    const options = {
        from: "loehe-band@live.de",
        to:  "loehe-band@live.de",
        subject: `${subject}`,
        text: `${message}`
    };

    transporter.sendMail(options, function(err, info) {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Send: " + info.response);
    })

}

module.exports = mail;