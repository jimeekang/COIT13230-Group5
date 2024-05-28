const AppError = require('../utils/AppError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const productModel = require('../model/productModel');

exports.getCheckoutSession = async (req, res, next) => {
  try {
    // TODO -- get the currently bbought product

    const product = await productModel.findById(req.params.productID);

    // TODO -- create checkout session
    console.log(product);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/`,
      cancel_url: `${req.protocol}://${req.get('host')}/`,
      customer_email: req.users.email,
      client_reference_id: req.params.productID,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: [
                `https://localhost:8000/img/products/${product.imageCover}`,
              ],
            },
            unit_amount: product.price * 100, // Amount in cents
          },

          quantity: 1,
        },
      ],
      mode: 'payment',
    });

    // TODO -- send the session to the client

    res.status(200).json({
      status: 'success',
      session,
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};
