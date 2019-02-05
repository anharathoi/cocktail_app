const express = require('express');
const router = express.Router();
const Cocktail = require('../../../models/Cocktail.model');
const passport = require('passport');

// Passport Config
require('../../../config/passport')(passport);

// Passport Middleware
router.use(passport.initialize());
router.use(passport.session());


// get cocktails
router.get('/cocktails', passport.authenticate('jwt', {session: false}),(req, res) => {
  Cocktail.find({})
  .then(cocktails =>{
    if(req.user.admin){
      console.log(`hello ${cocktails}`)
      return res.send(cocktails)
    } else {
        return res.status(403).send("Admin privileges required")
    }
  })
  .catch(err => {
    res.status(400).send(err)
  })
})
    
  // console.log("hello this is cocktails backend"+req.user.admin)

// post cocktails
 router.post('/newcocktail', passport.authenticate('jwt', {session: false}),(req, res) => {
   console.log('here')
  if(req.user.admin){ 
    console.log(req.user)
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

// delete cocktails
router.delete('/admin/cocktail/delete/:title',passport.authenticate('jwt', {session: false}), (req, res) => {
  const {title} = req.params;
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

// put/patch cocktails
router.patch('/admin/cocktail', passport.authenticate('jwt', {session: false}),(req, res) => {
  const {title} = req.body;
  const {newtitle} = req.body;
  Cocktail.findOne({title})
  .then( cocktail => {   
    if(req.user.admin){
      console.log(newtitle)
      console.log(title)
      console.log(cocktail)
      cocktail.title = newtitle;
      cocktail.save();
      res.send(cocktail);
    } else {
        return res.status(403).send("Admin privileges required")
    }
  })
  .catch ( err => {
    res.status(400).send(err);
  })
})

module.exports = router;