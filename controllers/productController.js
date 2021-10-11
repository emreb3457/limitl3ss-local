const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// Create new product   =>   /api/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    if (!req.file) {
        next(new ErrorHandler("File upload failed", 501))
    }
    const newpath = req.file.path.slice(6)
    let image = {
        url: newpath,
        orjname: req.file.originalname

    }
    req.body.image = image
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


// Get all products   =>   /api/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })

})

// Get single product details   =>   /api/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    const user = await product.clicks.filter(usr => usr.userId == req.user._id.toString())
    if (user.length > 0) {
        res.status(200).json({
            success: true,
            product
        })
    }
    else {
        await product.clicks.push({ 'userId': req.user._id.toString() })
        await product.save({ validateBeforeSave: false });
        res.status(200).json({
            success: true,
            product
        })
    }
})

// Update Product   =>   /api/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

})

// Delete Product   =>   /api/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})

// Recent Product& Recent Offers   =>   /api/recentoffers
exports.recentOffers = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.find({}).sort({ createdAt: -1 }).limit(6);
    res.status(200).json({
        success: true,
        product
    })

})

// Best Offers Product& Best Offers   =>   /api/bestoffers
exports.bestOffers = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.find({}).sort({ 'clicks': -1 }).limit(6);
    res.status(200).json({
        success: true,
        product
    })
})
