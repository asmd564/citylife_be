import { DataTypes } from 'sequelize';
import { sequelize } from "../db.js";

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        primaryKey: true,
    },
    avatar: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    surname: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    role: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    password: {
        type: DataTypes.STRING,
    },
    activationToken: {
        type: DataTypes.STRING,
    },
    position: {
        type: DataTypes.STRING,
    },
    exp: {
        type: DataTypes.STRING,
    },
    viber: {
        type: DataTypes.STRING,
    },
},{
    tableName: 'users',
    updatedAt:false,
    createdAt: false
})