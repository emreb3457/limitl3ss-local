const express = require('express')
const router = express.Router();

const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

const { isAuthUser } = require('../middlewares/auth');


router.route('/products').get(isAuthUser,getProducts);

router.route('/product/:id').get(isAuthUser,getSingleProduct);

router.route('/admin/product/new').post(isAuthUser, newProduct);
router.route('/admin/product/:id')
    .put(isAuthUser, updateProduct)
    .delete(isAuthUser, deleteProduct);


module.exports = router;