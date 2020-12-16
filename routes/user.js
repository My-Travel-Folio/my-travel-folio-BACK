const express = require('express');
const router  = express.Router();

const User    = require('../models/User');
const Travel  = require('../models/Travel')
const File    = require('../models/File')

// include CLOUDINARY:
const uploader = require('../configs/cloudinary-setup');


//POST: create new travel
router.post('/new-travel/:id', (req, res, next) => {
  const {
    travelName, 
    startDate, 
    endDate,
    startDateFixed, 
    endDateFixed
  } = req.body

  const userID = req.params.id

  Travel.create({
    userID,
    travelName,
    startDate,
    endDate,
    startDateFixed, 
    endDateFixed
  })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => res.send(err))
})

//POST: deletetravel

router.post('/delete-travel/:id', (req, res, next) => {

  // const travelID = req.params.id

  Travel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send(result)
      console.log(result)
    })
    .catch((err) => {
      console.log
      res.send(err)})
})


//GET: search all travels
router.get('/all-travels/:id', (req, res, next) => {

  Travel.find({userID: req.params.id})
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.get('/files', (req, res, next) => {
  File.find()
    .then(filesFromDB => res.status(200).json(filesFromDB))
    .catch(err => next(err));
});

router.get('/files/:id', (req, res, next) => {
  // console.log(typeof req.body.travelID)
  File.find({travelID: req.params.id})
    .then(filesFromDB => res.status(200).json(filesFromDB))
    .catch(err => next(err));
});

router.post('/new-file', (req, res, next) => {
  const {
    travelID,
    imageUrl,
    fileName,
    category,
    comment,
    date,
    fixedDate
  } = req.body

  File.create({
    travelID,
    fileName,
    imageUrl,
    category,
    comment,
    date,
    fixedDate
  })
    .then(result => result)
    .catch(err => next(err));
});

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.path });
})

//POST: deletetravel

router.post('/delete-file/:id', (req, res, next) => {

  // const travelID = req.params.id

  File.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send(result)
      console.log(result)
    })
    .catch((err) => {
      console.log
      res.send(err)})
})

//POST: edit travel
//POST: edit file


module.exports = router;