const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const config = require('../config');

const s3 = new aws.S3({
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccess,
    region: config.awsRegion,
    bucket: config.bucket
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.bucket,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: 'TESTING_META_DATA'});
        },
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now().toString());
        }
    }),
        limits:{ fileSize: 6000000 }, // 6 MB
        fileFilter: function( req, file, cb ) {
            checkFileType(file, cb);
        }
}).single('image');

function checkFileType( file, cb ){
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Invalid Mime Type. Only JPEG, PNG, and GIF');
    }
}

module.exports = upload;