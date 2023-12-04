import express from 'express';
import jwt from'jsonwebtoken';
import multer from 'multer';
import { userController } from '../controllers/user.controller.js';
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

export const userRouter =  new express.Router();

userRouter.get('/', userController.getAllActivated);
userRouter.get('/:id', userController.getById);
userRouter.get('/all', userController.getAll);
userRouter.put('/:id', upload.single('avatar'), userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);