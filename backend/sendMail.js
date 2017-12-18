var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'decepticon.gl@gmail.com',
    pass: 'Global11!'
  }
});

var mailOptions = {
  from: 'decepticon.gl@gmail.com',
  to: 'chetu.anilk3@gmail.com',
  subject: 'GL Interview Bot',
  text: 'https://4f10c906.ngrok.io/glibot'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('error: '+error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});