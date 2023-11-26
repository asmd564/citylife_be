import express from 'express';
import jwt from'jsonwebtoken';
import { userController } from '../controllers/user.controller.js';

export const userRouter =  new express.Router();

userRouter.get('/', userController.getAllActivated);
userRouter.get('/:id', userController.getById);
userRouter.get('/all', userController.getAll);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);