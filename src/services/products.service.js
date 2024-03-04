import { Product } from '../models/product.js';


export const getAll = async (filters) => {
    const { type, minPrice, maxPrice, district } = filters;

    // Определите объект фильтрации на основе переданных параметров
    const filterObject = {};
    if (type) filterObject.type = type;
    if (minPrice !== undefined) filterObject.price = { [Op.gte]: minPrice };
    if (maxPrice !== undefined) filterObject.price = { [Op.lte]: maxPrice };
    if (district) filterObject.district = district;

    // Запрос к базе данных с использованием фильтров
    const result = await Product.findAll({
        where: filterObject,
    });
    return result;
}

export const getById = async (id) => {
    const product = await Product.findByPk(id);
     return product;
}

export const create = async (
    name,
    imageUrls,
    description,
    title,
    price,
    type,
    rooms,
    area,
    state,
    flor,
    heating,
    waterheating,
    buildingtype,
    adress,
    district,
    top,
    favotire,
    currency,
    city,
    isHouse,
    lat,
    lng,
    user_id
    ) => {
        return Product.create({
            name,
            imgUrls: imageUrls,
            description,
            title,
            price,
            type,
            rooms,
            area,
            state,
            flor,
            heating,
            waterheating,
            buildingtype,
            adress,
            district,
            top,
            favotire,
            currency,
            city,
            isHouse,
            lat,
            lng,
            user_id
        })
}

export const update = async ({
    id,
    name,
    imgUrls,
    description,
    title,
    price,
    type,
    rooms,
    area,
    state,
    flor,
    heating,
    waterheating,
    buildingtype,
    adress,
    district,
    top,
    favotire,
    currency,
    city,
    isHouse,
    lat,
    lng,
    user_id
}) => {
    await Product.update({ 
        name,
        imgUrls,
        description,
        title,
        price,
        type,
        rooms,
        area,
        state,
        flor,
        heating,
        waterheating,
        buildingtype,
        adress,
        district,
        top,
        favotire,
        currency,
        city,
        isHouse,
        lat,
        lng,
        user_id
    }, { where: { id } })
}

export const remove = async (id) => {
    await Product.destroy({
        where: { id }
    })
}
