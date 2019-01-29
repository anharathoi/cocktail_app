const express = require('express');
const router = express.Router();
const Cocktail = require('../../../models/Cocktail.model');


// get cocktails
router.get('/cocktails', (req, res) => {
  Cocktail.find({})
  .then(doc =>{
    console.log(`hello ${doc}`)
    return res.send(doc)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

// post cocktails
 router.post('/newcocktail', (req, res) => {
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
 })

// delete cocktails
router.delete('/admin/cocktail/:title', (req, res) => {
  const {title} = req.params;
  Cocktail.findOneAndRemove({title})
  .then( cocktail => {
    res.send(`you have deleted ${cocktail}`);
  })
  .catch ( err => {
    res.status(400).send(err);
  })
})

// put cocktails
router.put('/admin/cocktail/:title', (req, res) => {
  const {title} = req.params;
  const {newtitle} = req.body;
  Cocktail.findOneAndUpdate({title})
  .then( cocktail => {
    cocktail.title = newtitle;
    cocktail.save();
    res.send(cocktail);
  })
  .catch ( err => {
    res.status(400).send(err);
  })
})

module.exports = router;