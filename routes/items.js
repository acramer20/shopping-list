const Item = require('../item');
const express = require('express');

const router = express.Router();

// GET /items - this should render a list of shopping items.

router.get('', (req, res, next) => {
    try {
      return res.json({ items: Item.findAll() });
    } catch(err){
      return next(err)
    }
  });

//POST /items - this route should accept JSON data and add it to the shopping list.

router.post('', (req, res, next) => {
    try {
      let newItem = new Item(req.body.name, req.body.price);
      return res.json({item: newItem});
    } catch (err) {
      return next(err)
    }
  });

//GET /items/:name - this route should display a single item’s name and price.

router.get('/:name', (req, res, next) => {
    try {
      let foundItem = Item.find(req.params.name);
      return res.json({item:foundItem});
    } catch(err){
      return next(err)
    }
  });

// PATCH /items/:name, this route should modify a single item’s name and/or price.

router.patch('/:name', (req, res, next) => {
    try {
      let foundItem = Item.update(req.params.name, req.body);
      return res.json({ item: foundItem });
    } catch (err) {
      return next(err)
    }
  });

// DELETE /items/:name - this route should allow you to delete a specific item from the array.

router.delete('/:name', (req, res, next) => {
    try {
      Item.remove(req.params.name);
      return res.json({message:'Deleted'});
    } catch (err) {
      return next(err)
    }
  });
  
  module.exports = router;