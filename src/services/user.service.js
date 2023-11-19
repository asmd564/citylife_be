import { User } from '../models/user.js';

function getAllActivated() {
    return User.findAll({
        where: {
            activationToken: null
        }
    })
}

function getAll() {
    return User.findAll()
}

function getById(id) {
    return User.findByPk(id);
}

function normalize({ id, email }) {
    return { id, email };
}

function normalizeAll({ id, email, name, surname, phone, avatar, role, position, exp }) {
    return { id, email, name, surname, phone, avatar, role, position, exp };
}

function findByEmail(email) {
    return User.findOne({ where: { email }})
}

export const userService = {
    getAllActivated,
    normalize,
    findByEmail,
    getById,
    normalizeAll,
    getAll
}