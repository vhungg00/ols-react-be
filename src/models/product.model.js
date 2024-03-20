const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const replieCommentProduct = new Schema({
  content: { type: String },
  isAdmin: Boolean,
  nameUser: { type: String },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const commentProduct = new Schema({
  author: { type: String },
  status: String,
  isAdmin: Boolean,
  avatar: { type: String },
  content: { type: String },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  replies: [replieCommentProduct],
});

const image = new Schema({
  url: { type: String },
  title: { type: String },
  cloudinary_image_id: { type: String },
});

const color = new Schema({
  colorTitle: String,
  colorCode: String,
});

const size = new Schema({
  sizeTitle: {
    type: String,
    enum: ['S', 'M', 'L', 'XS', 'XXS', 'XL', 'XXL'],
  },
});

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    descriptions: { type: String },
    image: { type: String },
    cloudinary_id: { type: String },
    images: [image],
    colors: [color],
    sizes: [size],
    amount: Number,
    rating: { type: Number },
    numReviews: { type: Number },
    blog: String,
    reviews: [reviewSchema],
    comments: [commentProduct],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
