const express = require('express');
const uploadImage = require('../middlewares/uploadImage');
const { uploadImageController, getAllImagesController, getImageController, updateImageBoundariesController, deleteImageController } = require('../controllers/imageController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/upload',authenticate, uploadImage.single('image'), uploadImageController);
router.get('/image/:id',authenticate, getImageController);
router.get('/images',authenticate, getAllImagesController);
router.put('/image/:id',authenticate, updateImageBoundariesController);
router.delete('/image/:id',authenticate, deleteImageController);

module.exports = router;