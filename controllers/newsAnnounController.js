const Newsandannoun = require('../models/newsAnnoun')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const fs = require("fs");

// Create News & Announcement   =>   /api/admin/news/new
exports.newNews = catchAsyncErrors(async (req, res, next) => {

    if (!req.file) {
        next(new ErrorHandler("File upload failed", 501))
    }
    const newpath = req.file.path.slice(6)
    let image = {
        url: newpath,
        orjname: req.file.originalname

    }
    req.body.image = image
    const data = await Newsandannoun.create(req.body);

    res.status(201).json({
        success: true,
        data
    })
})


// Get all News & Announcement   =>   /api/news
exports.getNews = catchAsyncErrors(async (req, res, next) => {

    data = await Newsandannoun.find();
    res.status(200).json({
        success: true,
        data
    })

})

// Get single News & Announcement   =>   /api/news/:id
exports.getSingleNews = catchAsyncErrors(async (req, res, next) => {

    const data = await Newsandannoun.findById(req.params.id);

    if (!data) {
        return next(new ErrorHandler('News & Announcement not found', 404));
    }

    res.status(200).json({
        success: true,
        data
    })

})

// Update News & Announcement   =>   /api/admin/news/:id
exports.updateNews = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body)
    let data = await Newsandannoun.findById(req.params.id);

    if (!data) {
        return next(new ErrorHandler('News & Announcement not found', 404));
    }

    data = await Newsandannoun.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        data
    })

})

// Delete News & Announcement   =>   /api/admin/news/:id
exports.deleteNews = catchAsyncErrors(async (req, res, next) => {

    const data = await Newsandannoun.findById(req.params.id);
    if (!data) {
        return next(new ErrorHandler('News & Announcement not found', 404));
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
        message: 'News & Announcement is deleted.'
    })
})
