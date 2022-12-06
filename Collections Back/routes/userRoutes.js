import express from 'express';
import isAuth from '../middleware/isAuth.js';
import * as collectionController from '../controllers/collectionController.js';
import * as userController from '../controllers/userController.js';
import * as itemController from '../controllers/itemController.js';
import * as commentController from '../controllers/commentComtroller.js';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

//User
router.post('/signup', userController.createUser);
router.post('/login', userController.login);

//Collection
router.post(
  '/collection/create',
  isAuth,
  collectionController.createCollection
);
router.post(
  '/collection/delete/:id',
  isAuth,
  collectionController.deleteCollection
);
router.post(
  '/collection/edit/:collectionId',
  isAuth,
  collectionController.editCollection
);
router.get(
  '/collection/:collectionId',
  collectionController.getSingleCollection
);
router.get(
  '/profile/:userId/edit/:collectionId',
  collectionController.getCollectionsDetails
);
router.get('/profile/:userId', collectionController.getUserCollections);
router.get('/getAll', collectionController.getAllData);

//Item
router.get(
  '/collection/:collectionId/getItems',
  collectionController.getItemsFromCollection
);
router.post('/likeItem', isAuth, itemController.likeItem);
router.post('/createItem', isAuth, itemController.createItem);
router.post('/item/:itemId/delete', isAuth, itemController.deleteItem);
router.get('/items/:itemId', itemController.getSingleItem);

//Comment
router.post('/createComment', isAuth, commentController.createComment);
router.post('/deleteComment', isAuth, commentController.deleteComment);
router.post('/editComment', isAuth, commentController.updateComment);

// Admin
router.get('/panel', adminController.getUsersInfo);
router.post('/deleteUser', isAuth, adminController.deleteUser);

export default router;
