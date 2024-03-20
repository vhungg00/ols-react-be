const httpStatus = require('http-status');
const cloudinary = require('cloudinary');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const uploader = await cloudinary.uploader.upload(req.flie.path, {
    folder: 'dev_setups',
  });
  const productBody = {
    image: uploader.secure_url,
    cloudinary_id: uploader.public_id,
    ...req.body,
  };
  const product = await productService.createProduct(productBody);

  res.status(httpStatus.CREATED).send(product);
});

module.exports = { createProduct };
