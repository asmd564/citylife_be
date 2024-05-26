import express from 'express';
import * as reviewsController from '../controllers/reviews.controller.js';

const reviewsRouter = express.Router();

reviewsRouter.get("/", reviewsController.get);

reviewsRouter.get("/:id", reviewsController.getOne);

reviewsRouter.post('/', reviewsController.addOne);

reviewsRouter.delete('/:id', reviewsController.removeOne);

reviewsRouter.put('/:id', reviewsController.editOne);

export { reviewsRouter };
