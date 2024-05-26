import * as productsService from '../services/products.service.js';
import multer from 'multer';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import 'dotenv/config.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage, limits: { files: 30 } });

export const uploadImageHandler = upload.array('images', 30);

export const get = async (req, resp) => {
    try {
        const filters = req.query;
        const products = await productsService.getAll(filters);
        resp.send(products);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ error: 'Ошибка при получении продуктов', details: error.message });
    }
}

export const getOne = async (req, resp) => {
    const { id } = req.params;
    const product = await productsService.getById(id)
    resp.send(product);
}

export const addOne = async (req, resp) => {
    const { name, description, title, price, type, rooms, area, state, flor, heating, waterheating, buildingtype, adress, district, top, favotire, currency, city, isHouse, lat, lng, user_id } = req.body;
    const imgUrls = [];

    try {
        for (const file of req.files) {
            const __filename = fileURLToPath(import.meta.url);
            const watermarkPath = path.join(path.dirname(__filename),'waterpath.png');

            const processedImage = await sharp(file.path)
                .rotate()
                .resize({ width: 900 })
                .composite([{ input: watermarkPath, gravity: 'center', blend: 'over', opacity: 0.6 }])
                .toBuffer();

            const filename = `${Date.now()}-${file.originalname}`;

            await sharp(processedImage).toFile(`src/uploads/${filename}`);

            imgUrls.push(`http://${process.env.CLIENT_HOST}/uploads/${filename}`);
            fs.unlinkSync(file.path);
        }

        const product = await productsService.create(
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
            user_id,
        );

        resp.status(201).send(product);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ error: 'Ошибка при создании продукта' });
    }
}

export const removeOne = async (req, resp) => {
    const { id } = req.params;
    try {
        const product = await productsService.getById(id);
        if (!product) {
            resp.sendStatus(404);
            return;
        }

        if (product.imgUrls && product.imgUrls.length > 0) {
            for (const imgUrl of product.imgUrls) {
                const filename = path.basename(imgUrl);
                const imagePath = path.join('src/uploads', filename);
                fs.unlinkSync(imagePath);
            }
        }

        await productsService.remove(id);

        resp.sendStatus(204);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ error: 'Ошибка при удалении продукта', details: error.message });
    }
}

export const editOne = async (req, resp) => {
    const { id } = req.params;
    const { imgUrls, ...fieldsToUpdate } = req.body; // Получаем новый массив imgUrls и другие поля для обновления

    try {
        const project = await productsService.getById(id);
        if (!project) {
            resp.sendStatus(404);
            return;
        }

        // Обновляем запись проекта в базе данных, заменяя старый массив imgUrls на новый
        await products.service.update({
            id,
            imgUrls,
            ...fieldsToUpdate
        });

        resp.sendStatus(200);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ error: 'Ошибка при обновлении проекта', details: error.message });
    }
};

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    return arr1.every((value, index) => value === arr2[index]);
}