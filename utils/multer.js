const multer = require('multer')
const fs = require('fs');

module.exports = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./public/images`)
            console.log(__dirname)
        },
        filename: (req, file, cb) => {
            try {
                const stats = fs.lstatSync(`./public/images/${file.originalname}`);
                if (stats.isFile()) {
                    file.originalname = Date.now() + "-" + file.originalname
                }
            } catch (error) {
                console.log("File not found next")
            }
            cb(null, `${file.originalname}`)
        }
    })
    const fileFilter = (req, file, cb) => {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
            cb(null, true);
        } else {
            cb(null, false);
        }

    }
    return upload = multer({ storage, fileFilter })
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}