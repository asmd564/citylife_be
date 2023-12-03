import { User } from "../models/user.js";
import { userService } from "../services/user.service.js";

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
    const { email, password, name, avatar } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            resp.status(404).send('Пользователь не найден');
            return;
        }

        if (email) {
            user.email = email;
        }

        if (name) {
            user.name = name;
        }

        if (avatar) {
            user.avatar = avatar;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

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