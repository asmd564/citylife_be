import { DataTypes } from 'sequelize';
import { sequelize } from "../db.js";

export const Review = sequelize.define('review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    publish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    review: {
        type: DataTypes.STRING,
    },
},{
    tableName: 'reviews',
    updatedAt:false,
    createdAt: false
})