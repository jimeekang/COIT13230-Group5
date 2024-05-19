const multer = require('multer');
const path = require('path');
const productModel = require('../model/productModel');
const AppError = require('../utils/AppError');
const ApiFeatures = require('../utils/apiFeatures');
const reviewModel = require('../model/reviewModel');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('image');

// TODO -- admin user can create a product
exports.createProduct = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return next(new AppError('File upload error', 400));
    } else if (err) {
      return next(err);
    }

    try {
      const {
        name,
        description,
        price,
        brand,
        category,
        display,
        processor,
        ram,
        storage,
        graphics,
        battery,
        stock,
        tag,
      } = req.body;

      // Handle image if uploaded:
      const image = req.file ? req.file.path : 'sss'; // Get the path of the uploaded image

      const productData = {
        ratingAverage: 4.7,
        name,
        description,
        price,
        brand,
        category,
        specifications: {
          display,
          processor,
          ram,
          storage,
          graphics,
          battery,
          image: image,
          stock: stock,
          tag: tag,
        },
        image: image,
        stock: stock,
        tag: tag,
      };

      const product = await productModel.create(productData);
      // res.status(200).json({
      //   status: 'success',
      //   data: product,
      // });
      res.redirect('/addProduct');
    } catch (err) {
      return next(new AppError(err.message, 404));
    }
  });
};

// TODO -- Get All products and Query Features includes (Sorting & Filtering & Pagination &  Limiting)

exports.getAllproducts = async (req, res, next) => {
  const queryObject = req.query;

  try {
    const features = new ApiFeatures(productModel.find(), queryObject)
      .filter()
      .sort()
      .limiting()
      .paginate();

    const products = await features.query;

    res.status(200).json({
      status: 'success',
      length: products.length,
      data: products,
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

//TODO -- admin can delete all products from the database.
exports.deleteAllProducts = async (req, res, next) => {
  try {
    const deleted = await productModel.deleteMany();

    res.status(200).json({
      status: 'products successfully deleted.',
      data: deleted,
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

// TODO - For getting product by ID
exports.getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.render('productDetail.html', { product });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(id);

    res.status(200).json({
      status: 'success',
      data: {
        data: product,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};
