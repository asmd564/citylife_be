import express from 'express';
import jwt from'jsonwebtoken';
import { authController } from '../controllers/auth.controller.js';

export const authRouter =  new express.Router();

authRouter.post('/registration', authController.registration);
authRouter.get('/activation/:activationToken', authController.activate);
authRouter.post('/login', authController.login)

