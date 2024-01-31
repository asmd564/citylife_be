import express from 'express';
import * as productController from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", productController.get);

router.get("/:id", productController.getOne);

router.post('/',productController.uploadImageHandler, productController.addOne);

router.delete('/:id', productController.removeOne);

router.put('/:id', productController.editOne);


export { router };