import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/user.js";
import { userService } from "../services/user.service.js";
import bcrypt from 'bcrypt';
import path from "path";
import 'dotenv/config.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/avatars/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = file.originalname.split('.').pop();
      cb(null, `${uuidv4()}-${uniqueSuffix}.${extension}`);
    }
});

const upload = multer({ storage: storage });

const getAllActivated = async (req, resp) => {
    const users = await userService.getAllActivated();

    resp.send(
        users
        )
}

const getAll = async (req, resp) => {
    const users = await userService.getAll();

    resp.send(
        users.map(userController.normalizeAll)
        )
}

const getById = async (req, resp) => {
    const { id } = req.params;
    const user = await userService.getById(id)
    resp.send(user);
}

const updateUser = async (req, resp) => {
    const { id } = req.params;
    const { email, password, name, surname, exp, position, phone, viber, telegram } = req.body;

    try {
        let user = await User.findByPk(id);

        if (!user) {
            return resp.status(404).send('Пользователь не найден');
        }

        const multerUpload = util.promisify(upload.single('avatar'));
        await multerUpload(req, resp);

        if (email !== undefined) {
            user.email = email;
        }

        if (phone !== undefined) {
            user.phone = phone;
        }

        if (viber !== undefined) {
            user.viber = viber;
        }

        if (telegram !== undefined) {
            user.telegram = telegram;
        }

        if (name !== undefined) {
            user.name = name;
        }


        if (exp !== undefined) {
            user.exp = exp;
        }


        if (position !== undefined) {
            user.position = position;
        }

        if (surname !== undefined) {
            user.surname = surname;
        }

        if (req.file) {
            const avatarPath = `${process.env.CLIENT_HOST}/${req.file.path}`.replace('src/', '');
            user.avatar = avatarPath;
        }

        if (password !== undefined && password !== user.password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        user = await user.save();
        console.log(req.file)

        resp.send(user);
    } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
        resp.status(500).send('Ошибка сервера при обновлении данных пользователя');
    }
};



const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            res.sendStatus(404);
            return;
        }

        await user.destroy();
        res.sendStatus(204); // Успешно удалено
    } catch (error) {
        res.sendStatus(500); // Ошибка сервера
    }
};

export const userController = {
    getAllActivated,
    getById, 
    getAll, 
    updateUser,
    deleteUser
}