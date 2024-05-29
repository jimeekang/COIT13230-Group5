const productModel = require('../model/productModel');
const AppError = require('../utils/AppError');
const ApiFeatures = require('../utils/apiFeatures');

// TODO -- admin user can get all products
exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      brand,
      category,
      specifications,
      image,
      stock,
      tag,
    } = req.body;
    console.log(specifications);

    const product = await productModel.create({
      name,
      description,
      price,
      brand,
      category,
      specifications,
      image,
      stock,
      tag,
    });

    res.status(200).json({
      status: 'success',
      data: product,
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

// TODO -- Get All products and Query Features includes (Sorting & Filtering & Pagination &  Limiting)

exports.getAllproducts = async (req, res, next) => {
  const queryObject = req.query;

  console.log(queryObject);
  try {
    const features = new ApiFeatures(productModel.find(), queryObject)
      .filter()
      .sort()
      .limiting()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      length: tours.length,
      data: tours,
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
    const product = await productModel.findById(id).populate('reviews');

    if (!product) {
      throw new AppError('product not found', 404);
    }

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

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

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
