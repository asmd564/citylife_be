import * as reviewsService from '../services/reviews.service.js';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import 'dotenv/config.js';

export const get = async (req, resp) => {
    const reviews = await reviewsService.getAll();

    resp.send(reviews)
}

export const getOne = async (req, resp) => {
    const { id } = req.params;
    const review = await reviewsService.getById(id)
    resp.send(review);
}

export const addOne = async (req, resp) => {
    const { name, review: reviewText, publish } = req.body;

    try {
        const review = await reviewsService.create(
            name,
            reviewText,
            publish
        );

        resp.status(201).send(review);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ error: 'Ошибка при создании отзыва' });
    }
}

export const removeOne = async (req, resp) => {
    const { id } = req.params;
    try {
        const review = await reviewsService.getById(id);
        if (!review) {
            resp.sendStatus(404);
            return;
        }

        await reviewsService.remove(id);

        resp.sendStatus(204);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ error: 'Ошибка при удалении комментария', details: error.message });
    }
}

export const editOne = async (req, resp) => {
    const { id } = req.params;
    const { ...fieldsToUpdate } = req.body;

    try {
        const review = await reviewsService.getById(id);
        if (!review) {
            resp.sendStatus(404);
            return;
        }

        // Обновляем запись проекта в базе данных, заменяя старый массив imgUrls на новый
        await reviewsService.update({
            id,
            ...fieldsToUpdate
        });

        resp.sendStatus(200);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ error: 'Ошибка при обновлении проекта', details: error.message });
    }
};

