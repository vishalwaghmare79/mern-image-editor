const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const tf = require('@tensorflow/tfjs'); // or '@tensorflow/tfjs'
const cocoSsd = require('@tensorflow-models/coco-ssd');
const asyncHandler = require('../middlewares/asyncHandler');
const { getImageTensorFromPath, getRandomColor, generateImageUrl } = require('../utils/imageUtils');
const Image = require('../models/image');

// Load COCO-SSD model
let model;
(async () => {
  try {
    await tf.ready();
    model = await cocoSsd.load();
    console.log('Model loaded successfully');
  } catch (err) {
    console.error('Failed to load model:', err);
  }
})();

const uploadImageController = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  if (!req.file) return next({ statusCode: 400, message: 'No file uploaded' });

  try {
    const { width, height } = await sharp(req.file.path).metadata();

    const imageBuffer = await sharp(req.file.path)
      .removeAlpha()
      .raw()
      .toBuffer();

    const imageTensor = tf.tensor3d(imageBuffer, [height, width, 3], 'int32');
    
    if (!model) {
      fs.unlinkSync(req.file.path);
      return next({ statusCode: 500, message: 'Model is not ready, please try again later.' });
    }

    const predictions = await model.detect(imageTensor);
    imageTensor.dispose();

    if (!predictions || predictions.length === 0) {
      fs.unlinkSync(req.file.path);
      return next({ statusCode: 400, message: 'No boundaries detected, Try another image.' });
    }

    const boundaries = predictions.map(pred => ({
      label: pred.class,
      score: pred.score,
      bbox: pred.bbox, // [x, y, width, height]
      color: getRandomColor(),
    }));

    const imageUrl = generateImageUrl(req, req.file.filename);

    const newImage = await Image.create({
      userId,
      filename: req.file.filename,
      path: req.file.path,
      url: imageUrl,
      originalName: req.file.originalname,
      boundaries,
    });

    res.status(201).json({ success: true, message: 'Image uploaded successfully', image: newImage });

  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); 
    }
    return next({ statusCode: 500, message: 'An error occurred while processing the image. Please try again.' });
  }
});

const getImageController = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const imageId = req.params.id;
  const image = await Image.findOne({ _id: imageId, userId }).lean();

  if (!image) return next({ statusCode: 404, message: 'Image not found' });

  res.status(200).json({ success: true, image });
})

const getAllImagesController = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const images = await Image.find({ userId }, '_id url originalName createdAt').lean();

  res.status(200).json({ success: true, images });
})

const updateImageBoundariesController = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const imageId = req.params.id;
  const { boundaries } = req.body;

  const image = await Image.findOne({ _id: imageId, userId }, '_id boundaries')
  if (!image) return next({ statusCode: 404, message: 'Image not found' });

  if (!boundaries) return next({ statusCode: 400, message: 'Boundaries are required' });
  if (!Array.isArray(boundaries)) return next({ statusCode: 400, message: 'Boundaries should be an array' });
  if (boundaries.length === 0) return next({ statusCode: 400, message: 'Boundaries array cannot be empty' });

  image.boundaries = boundaries;
  await image.save();

  res.status(200).json({ success: true, message: 'Boundaries updated successfully' });
})

const deleteImageController = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const imageId = req.params.id;
  const image = await Image.findOne({ _id: imageId, userId }, '_id path').lean();

  if (!image) return next({ statusCode: 404, message: 'Image not found' });

  // Delete the image file from the server
  fs.unlinkSync(image.path, (err) => {
    if (err) console.error('Error deleting file:', err);
  });

  await Image.deleteOne({ _id: imageId });

  res.status(200).json({ success: true, message: 'Image deleted successfully' });
})

module.exports = {
  uploadImageController,
  getImageController,
  getAllImagesController,
  updateImageBoundariesController,
  deleteImageController,
};

