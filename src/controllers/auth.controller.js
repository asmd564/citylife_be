import { User } from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { userService } from "../services/user.service.js";
import { jwtService } from "../services/jwt.service.js";
import { emailService } from "../services/email.service.js";
import bcrypt from 'bcrypt';
import path from "path";
import 'dotenv/config.js';


const registration = async (req, resp) => {
    try {
   const { email, password, name, surname, exp, position, phone, } = req.body;

   const activationToken = uuidv4();

   let avatar = null;
     if (req.file) {
        avatar = `${process.env.CLIENT_HOST}/${req.file.path}`.replace('src/', '');
     }

   const hashedPassword = await bcrypt.hash(password, 10);
    
   const newUser = await User.create({ email, password: hashedPassword, activationToken, name, avatar, exp, position, surname, phone });
   await emailService.sendActivationEmail(email, activationToken);
   resp.send(newUser);
    } catch (error) {
        resp.sendStatus(500)
    }
}

const activate = async (req, resp) => {
    const { activationToken } = req.params;
    const user = await User.findOne({ where: { activationToken }})

    if(!user) {
        resp.sendStatus(404);
        return;
    }
    user.activationToken = null;
    await user.save();

    resp.send("<h1>Ваш аккаунт активирован</h1>");
}

const login = async (req, resp) => {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);

    if(!user) {
        resp.send(401);
        return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        resp.sendStatus(401);
        return;
    }
    const normalizedUser = userService.normalize(user)
    const accessToken = jwtService.sign(normalizedUser)

    resp.send({
        user: normalizedUser,
        accessToken
    })
}

export const authController = {
    registration,
    activate,
    login,
}