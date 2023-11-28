import 'dotenv/config';
import express from "express";
import cors from 'cors';
import { router as productRouter} from './routes/product.route.js';
import path from 'path';
import nodemailer from 'nodemailer';
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from './routes/user.route.js';


const PORT = process.env.PORT ||3005;

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const imagePath = path.join(__dirname, 'uploads');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/email', (req, res) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'citylive.if@gmail.com',
        pass: 'zrfv dein pwun vzsq',
      },
    });
  
    let mailOptions = {
      from: 'citylive.if@gmail.com',
      to: 'citylive.if@gmail.com',
      subject: 'Нове повідомлення від City Life',
      text: `Name: ${req.body.name}\nPhone: ${req.body.phone}\nMessage: ${req.body.zapyt}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Произошла ошибка отправки письма');
      } else {
        console.log('Email отправлен: ' + info.response);
        res.send('Письмо успешно отправлено');
      }
    });
  });

app.use('/uploads', express.static(imagePath));
app.use('/avatars', express.static('src/avatars'));


app.use('/products', productRouter);

app.use(authRouter)
app.use('/users', userRouter)



app.listen(PORT, () => {
    console.log('server started', PORT);
});