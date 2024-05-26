import { Review } from '../models/review.js';


export const getAll = async () => {
    return Review.findAll()
}

export const getById = async (id) => {
    const review = await Review.findByPk(id);
     return review;
}

export const create = async (name, review, publish) => {
    return Review.create({
        name,
        review,
        publish,
    });
}

export const update = async ({
    id,
    name,
    review,
    publish,
}) => {
    await Review.update({ 
        name,
        review,
        publish,
    }, { where: { id } })
}

export const remove = async (id) => {
    await Review.destroy({
        where: { id }
    })
}