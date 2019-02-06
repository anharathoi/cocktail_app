const express = require('express');
const router = express.Router();
const Cocktail = require('../../../models/Cocktail.model');
const passport = require('passport');
const multer = require('multer');
const {uploadFile} = require('../../../utils/cloudinary.js')
// Passport Config
require('../../../config/passport')(passport);

// Passport Middleware
router.use(passport.initialize());
router.use(passport.session());

// multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage })

/**
|--------------------------------------------------
| GET COCKTAILS
|--------------------------------------------------
*/

router.get('/cocktails', passport.authenticate('jwt', {session: false}),(req, res) => {
  Cocktail.find({})
  .then(cocktails =>{
    if(req.user.admin){
      console.log(`27  - cocktails.controller.js - get cocktails  ${cocktails}`)
      return res.send(cocktails)
    } else {
        return res.status(403).send("Admin privileges required")
    }
  })
  .catch(err => {
    res.status(400).send(err)
  })
})
    
/**
|--------------------------------------------------
| POST COCKTAILS
|--------------------------------------------------
*/

 router.post('/newcocktail', passport.authenticate('jwt', {session: false}),(req, res) => {
  console.log(`46  - cocktails.controller.js - get cocktails  ${req.body}`)
  if(req.user.admin){ 
    console.log(`48  - cocktails.controller.js - get cocktails  ${req.user}`)
    const {title, photo, description, directions, ingredients, available} = req.body;
    Cocktail.create ({
      title,
      photo,
      description,
      directions,
      ingredients,
      available
    })
    .then ( cocktail => {
      res.send(cocktail);
    })
    .catch( err => {
      res.status(404).send(err);
    })
  } else {
      return res.status(403).send("Admin privileges required")
  }
  
 })

/**
|--------------------------------------------------
| DELETE COCKTAILS
|--------------------------------------------------
*/

router.delete('/admin/cocktail/delete/:title',passport.authenticate('jwt', {session: false}), (req, res) => {
  const {title} = req.params;
  // console.log(`78  - cocktails.controller.js - delete cocktails  ${req.params}`)

  Cocktail.findOneAndRemove({title})
  .then( cocktail => {
    if(req.user.admin){
      res.send(`you have deleted ${cocktail}`);
    } else {
        return res.status(403).send("Admin privileges required")
    }
  })
  .catch ( err => {
    res.status(400).send(err);
  })
})

/**
|--------------------------------------------------
| UPDATE COCKTAILS
|--------------------------------------------------
*/

router.patch('/admin/cocktail', passport.authenticate('jwt', {session: false}),(req, res) => {
  const {title, newtitle} = req.body
  // console.log(`101  - cocktails.controller.js - update cocktails  ${req.body}`)

  Cocktail.findOne({title})
  .then( cocktail => {   
    if(req.user.admin){
      console.log(`106  - cocktails.controller.js - update cocktails  ${cocktail}`)
      cocktail.title = newtitle
      cocktail.save()
      res.send(cocktail)
    } else {
        return res.status(403).send("Admin privileges required")
    }
  })
  .catch ( err => {
    res.status(400).send(err)
  })
})

/**
|--------------------------------------------------
| UPLOAD IMAGE
|--------------------------------------------------
*/

router.post('/upload', upload.single('file'), (req, res) => {
  const { buffer } = req.file
  // console.log(`127  - cocktails.controller.js - upload image  ${buffer}`)

  uploadFile(buffer)
  .then( resp => {
    const { secure_url } = resp
    console.log(`132  - cocktails.controller.js - upload image  ${secure_url}`)
    res.send(resp)
  })
  .catch(err => res.status(500).send('there was an error with cloudinary'))
})

module.exports = router