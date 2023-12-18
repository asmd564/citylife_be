import { Product } from '../models/product.js';


export const getAll = async () => {
    const result = await Product.findAll();
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
    ishouse,
    lat,
    lng
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
        ishouse,
        lat,
        lng
    }, { where: { id } })
}

export const remove = async (id) => {
    await Product.destroy({
        where: { id }
    })
}

