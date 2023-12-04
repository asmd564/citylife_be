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
        let user = await User.findByPk(id);

        if (!user) {
            return resp.status(404).send('Пользователь не найден');
        }

        // Проверяем, было ли отправлено новое значение для поля и обновляем только те поля, которые присутствуют в запросе
        if (email !== undefined) {
            user.email = email;
        }

        if (name !== undefined) {
            user.name = name;
        }

        if (avatar !== undefined) {
            user.avatar = avatar;
        }

        if (password !== undefined) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        user = await user.save(); // Обновляем и сохраняем пользователя

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