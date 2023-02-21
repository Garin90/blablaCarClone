//All this code is copied for cloudinary documentation
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

//Here are defined the environment variables that we have saved in .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blablacarClone' //this is the folder name created in cloudinary in parallel
  },
});

//Don't forget to export it.
module.exports = multer({ storage: storage });