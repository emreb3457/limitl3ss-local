const express = require('express')
const router = express.Router();
const multerUpload = require("../utils/multer")

const {
    newNews,
    getNews,
    deleteNews,
    updateNews,
    getSingleNews
} = require('../controllers/newsAnnounController')

const { isAuthUser } = require('../middlewares/auth');
let upload = multerUpload();

router.route('/news').get(isAuthUser, getNews);
router.route('/news/:id').get(isAuthUser, getSingleNews);

router.route('/admin/news/new').post(isAuthUser, upload.single("image"), newNews);
router.route('/admin/news/:id')
    .put(isAuthUser, updateNews)
    .delete(isAuthUser, deleteNews);


module.exports = router;