const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Travel = require('../models/Travel')
const File = require('../models/File')


//GET: my profile => se haría en el front
//GET: new travel => se haría en el front

//POST: create new travel
router.post('/new-travel', (req, res, next) => {
  const {
    // cambiar cuando esté la ruta del front funcionando
    userID,
    travelName, 
    startDate, 
    finishDate
  } = req.body

  // const userID = req.user._id

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


//POST: upload documents
router.post('/add-file', (req, res, next) => {
  const {
    // cambiar cuando esté la ruta del front funcionando
    travelID,
    fileName,
    fileURL,
    category,
    comment,
    date
  } = req.body

  // const userID = req.user._id

  File.create({
    travelID,
    fileName,
    fileURL,
    category,
    comment,
    date
  })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => res.send(err))
})

//POST: edit travel
//POST: edit file
//POST: delete travel
//POST: delete file

module.exports = router;