const GameAwards = require('../models/gameAwardsSchema')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const fs = require("fs");

// Create Game Awards   =>   /api/admin/gameaward/new
exports.newGameAwards = catchAsyncErrors(async (req, res, next) => {

    if (!req.file) {
        next(new ErrorHandler("File upload failed", 501))
    }
    const newpath = req.file.path.slice(6)
    let image = {
        url: newpath,
        orjname: req.file.originalname

    }
    req.body.image = image
    const data = await GameAwards.create(req.body);

    res.status(201).json({
        success: true,
        data
    })
})


// Get all Game Awards   =>   /api/gameawards
exports.getGameAwards = catchAsyncErrors(async (req, res, next) => {

    data = await GameAwards.find();
    res.status(200).json({
        success: true,
        data
    })

})

// Get single Game Awards   =>   /api/gameaward/:id
exports.getSingleGameAwards = catchAsyncErrors(async (req, res, next) => {

    const data = await GameAwards.findById(req.params.id);

    if (!data) {
        return next(new ErrorHandler('Game Award not found', 404));
    }

    res.status(200).json({
        success: true,
        data
    })

})

// Update Game Awards   =>   /api/admin/gameaward/:id
exports.updateGameAwards = catchAsyncErrors(async (req, res, next) => {

    let data = await GameAwards.findById(req.params.id);

    if (!data) {
        return next(new ErrorHandler('Game Award not found', 404));
    }

    data = await GameAwards.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        data
    })

})

// Delete Game Awards   =>   /api/admin/gameaward/:id
exports.deleteGameAward = catchAsyncErrors(async (req, res, next) => {

    const data = await GameAwards.findById(req.params.id);
    if (!data) {
        return next(new ErrorHandler('Game Award not found', 404));
    }
    await data.remove();

    fs.unlink(`./public/images/${data.image.orjname}`, (err => {
        if (err) console.log("No such file directory");
        else {
            console.log("files deleted");
        }
    }));
    res.status(200).json({
        success: true,
        message: 'Game Award is deleted.'
    })
})
