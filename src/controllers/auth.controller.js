import { User } from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { userService } from "../services/user.service.js";
import { jwtService } from "../services/jwt.service.js";


const registration = async (req, resp) => {
   const { email, password } = req.body;

   const activationToken = uuidv4();
   const newUser = await User.create({ email, password, activationToken });
   resp.send(newUser);
}

const activate = async (req, resp) => {
    const { activationToken } = req.params;
    const user = await User.findOne({ where: { activationToken }})

    if(!user) {
        resp.sendStatus(404);
        return;
    }
    user.activationToken = null;
    user.save();

    resp.send(user);
}

const login = async (req, resp) => {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);

    if(!user || user.password !== password) {
        resp.send(401);
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
    login
}