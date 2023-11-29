import * as productsService from '../services/products.service.js';
import multer from 'multer';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export const uploadImageHandler = upload.array('images', 30);

export const get = async (req, resp) => {
    resp.send(await productsService.getAll());
}

export const getOne = async (req, resp) => {
    const { id } = req.params;
    const product = await productsService.getById(id)
    resp.send(product);
}

export const addOne = async (req, resp) => {
    const { name, description, title, price, type, rooms, area, state, flor, heating, waterheating, buildingtype, adress, district, top, favotire, currency, city, ishouse, lat, lng, user_id } = req.body;
    const imgUrls = [];

    try {
        for (const file of req.files) {
            const __filename = fileURLToPath(import.meta.url);
            const watermarkPath = path.join(path.dirname(__filename),'waterpath.png'); // Путь к вашему водяному знаку

            // Используем библиотеку sharp для обработки изображения (наложение водяного знака)
            const processedImage = await sharp(file.path)
                .composite([{ input: watermarkPath, gravity: 'center', blend: 'over', scale: { width: '10%', height: '10%' }, opacity: 0.1 }])
                .toBuffer();

            // Генерируем новое имя файла для сохранения на сервере
            const filename = `${Date.now()}-${file.originalname}`;

            // Сохраняем обработанное изображение
            await sharp(processedImage).toFile(`src/uploads/${filename}`);

            imgUrls.push(`${process.env.CLIENT_HOST}/uploads/${filename}`);
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
            ishouse,
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


    if(!(await productsService.getById(id))) {
        resp.sendStatus(404);

        return;
    }

   await productsService.remove(id);

    resp.sendStatus(204);
}

export const editOne = async (req, resp) => {
    const { id } = req.params;
    const { name, imgUrl, description, title, price, type, rooms, area, state, flor, heating, waterheating, buildingtype, adress, district, top, favotire, currency, city, ishouse, lat, lng, user_id } = req.body;

    const product = await productsService.getById;
    if(!product) {
        resp.sendStatus(404);
        return;
    }

   const updatedProduct = await productsService.update({ id, name, imgUrl, description, title, price, type, rooms, area, state, flor, heating, waterheating, buildingtype, adress, district, top, favotire, currency, city, ishouse, lat, lng, user_id });

    resp.send(updatedProduct);

}
