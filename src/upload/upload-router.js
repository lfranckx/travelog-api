const express = require('express');
const uploadRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');

const upload = require('./upload-service');
const multipleUpload = require('./upload-multiple-service');

uploadRouter
    .post('/', requireAuth, (req, res) => { 
        upload(req, res, (error) => {
            if(error) {
                return res.status(400).json({ error: error });
            } 
            if (req.file === undefined) {
                res.status(400).json({ error: 'No file selected' });
            }
            
            const imageName = req.file.key;
            const imageLocation = req.file.location;
            res.json({
                image_name: imageName,
                image_url: imageLocation
            });
        });
    });

uploadRouter
    .post('/multiple', requireAuth, (req, res) => {
        multipleUpload(req, res, (error) => {
            if ( error ) {
                res.json( { error: error });
            }
            if (req.files === undefined) {
                res.json({ error: 'No file selected' });
            }
            const files = req.files;
            let locationsArray = [];
            files.map(file => {
                let fileLocation = file.location;
                locationsArray.push(fileLocation);
            });
            res.json({
                files: files,
                locationsArray: locationsArray
            });
        });
    });

module.exports = uploadRouter;