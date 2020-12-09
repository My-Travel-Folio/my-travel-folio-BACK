const express = require('express');
const router  = express.Router();

const User    = require('../models/User');
const Travel  = require('../models/Travel')
const File    = require('../models/File')

// include CLOUDINARY:
const uploader = require('../configs/cloudinary-setup.config');


//GET: my profile => se haría en el front
//GET: new travel => se haría en el front

//POST: create new travel
router.post('/new-travel/:id', (req, res, next) => {
  const {
    travelName, 
    startDate, 
    finishDate
  } = req.body

  const userID = req.params.id

  Travel.create({
    userID,
    travelName,
    startDate,
    finishDate,
  })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => res.send(err))
})


router.post('/add-file', uploader.single("imageUrl"), (req, res) => {
  const {
    // cambiar cuando esté la ruta del front funcionando
    travelID,
    fileName,
    category,
    comment,
    date
  } = req.body

  const imageUrl = req.file.path

  // const userID = req.user._id

  File.create({
    travelID,
    fileName,
    imageUrl,
    category,
    comment,
    date
  })
    .then((result) => {
      // console.log(result)
      res.send(result)
    })
    .catch((err) => res.send(err))
})

//POST: search all travels
router.get('/all-travels/:id', (req, res, next) => {

  Travel.find({userID: req.params.id})
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    res.send(err)
  })

})

//POST: edit travel
//POST: edit file
//POST: delete travel
//POST: delete file

module.exports = router;