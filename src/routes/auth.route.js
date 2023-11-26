import express from 'express';
import jwt from'jsonwebtoken';
import multer from 'multer';
import { authController } from '../controllers/auth.controller.js';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/avatars/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = file.originalname.split('.').pop();
      cb(null, `${uuidv4()}-${uniqueSuffix}.${extension}`);
    }
  });
  
  const upload = multer({ storage: storage });

export const authRouter =  new express.Router();

authRouter.post('/registration', upload.single('avatar'), authController.registration);
authRouter.get('/activation/:activationToken', authController.activate);
authRouter.post('/login', authController.login);

