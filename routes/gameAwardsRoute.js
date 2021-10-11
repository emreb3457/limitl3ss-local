const express = require('express')
const router = express.Router();
const multerUpload = require("../utils/multer")

const {
    newGameAwards,
    getSingleGameAwards,
    getGameAwards,
    updateGameAwards,
    deleteGameAward
} = require('../controllers/gameAwards')

const { isAuthUser } = require('../middlewares/auth');
let upload = multerUpload();

router.route('/gameawards').get(isAuthUser, getGameAwards);
router.route('/gameaward/:id').get(isAuthUser, getSingleGameAwards);

router.route('/admin/gameaward/new').post(isAuthUser, upload.single("image"), newGameAwards);
router.route('/admin/gameaward/:id')
    .put(isAuthUser, updateGameAwards)
    .delete(isAuthUser, deleteGameAward);


module.exports = router;