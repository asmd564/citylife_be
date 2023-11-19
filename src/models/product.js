import { sequelize } from '../db.js';
import { DataTypes } from 'sequelize';

export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.STRING,
    },
    rooms: {
        type: DataTypes.STRING,
    },
    area: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    flor: {
        type: DataTypes.STRING,
    },
    heating: {
        type: DataTypes.STRING,
    },
    waterheating: {
        type: DataTypes.STRING,
    },
    buildingtype: {
        type: DataTypes.STRING,
    },
    adress: {
        type: DataTypes.STRING,
    },
    district: {
        type: DataTypes.STRING,
    },
    top: {
        type: DataTypes.BOOLEAN,
    },
    currency: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    isHouse: {
        type: DataTypes.STRING,
    },
    lat: {
        type: DataTypes.DOUBLE,
    },
    lng: {
        type: DataTypes.DOUBLE,
    },
    typebuild: {
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    imgUrls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },

}, {
    tableName: 'products',
    updatedAt:false,
    createdAt: false
});
