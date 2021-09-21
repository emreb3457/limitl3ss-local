const express = require('express')
const router = express.Router();
const multerUpload = require("../utils/multer")
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    recentOffers,
    bestOffers
} = require('../controllers/productController')

const { isAuthUser } = require('../middlewares/auth');
let upload = multerUpload();

router.route('/products').get(isAuthUser, getProducts);

router.route('/product/:id').get(isAuthUser, getSingleProduct);

router.route('/recentoffers').get(isAuthUser, recentOffers);
router.route('/bestoffers').get(isAuthUser, bestOffers);

router.route('/admin/product/new').post(isAuthUser, upload.single("image"), newProduct);
router.route('/admin/product/:id')
    .put(isAuthUser, updateProduct)
    .delete(isAuthUser, deleteProduct);


module.exports = router;