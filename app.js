const express = require('express');
const { engine } = require("express-handlebars");
const app = express();
import mongoose from 'mongoose';
import path from 'path';
import ContactModel from "./Model/Contact";
import nodemailer from 'nodemailer';
import res from 'express/lib/response';

// template engine
app.engine('handlebars', engine());
app.set("view engine", 'handlebars');
// app.set('views', "./views");

                    // DATABASE CONNECTION
let mongodbURL = "mongodb://localhost:27017/student";
mongoose.connect(mongodbURL, err => {
    if (err) throw err;
    console.log("Database connected");
});
                    // DATABASE CONNECTION

                    //MIDDLEWRE BLOCK
app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname,'public'));
app.use(express.urlencoded({ entended: true }));
                    //MIDDLEWRE BLOCK
                    
//basic route
app.get('/', (req, res) => {
    res.render('home', {title:"Welcome to Jspiders"});
});
app.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact Us" });
});

// ===================All post request start here===============

app.post("/contact", async (req, res) => {
  //save incoming request into mongo db
  let payload = await req.body;
  //-------------------------node mailer bloack--------
  nodemailer
    .createTransport({
      service: "gmail",
      auth: {
        user: "girishkumarv07@gmail.com",
        pass: "Girishpwd@123",
      },
    })
    .sendMail({
      from: "girishkumarv07@gmail.com",
      to: [req.body.email, "girishvg944@gmail.com"],
      subject: "Contact form",
      html: ` <h1>${req.body.firstname} ${req.body.lastname}</h1>
        <p>Email : ${req.body.email}</p>
        <p>Mobile No : ${req.body.phone}</p>
        <p>Comments : ${req.body.desc}</p>
        `,
    });
  let data = await ContactModel.create(payload);
  // res.send({ data, text: "Successfully Submitted" });
  res.send(`<h1>Successfully submitted your Enquiry</h1>`);
});
// GETTING DETAILS FROM DATABASE AND PRINT ON VIEWS
app.get('/all-students', async (req, res) => {
  let data = await ContactModel.find({}).lean();
  res.render('all-students', { data });
});
// ===================All post request ends here===============
//listen port
app.listen(4000, err => {
    if (err) throw err;
    console.log("server is running on 4000");
});