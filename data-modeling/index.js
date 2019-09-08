'use strict';

const mongoose = require('mongoose');

const Categories = require('./models-singular/categories');

const categories = new Categories();

const categoryOne = {
  name: 'Category One',
  description: 'The first category'
};
const categoryTwo = {
  name: 'Category Two',
  description: 'The second category'
};

let catOneId;
let catTwoId;

// TODO - Verify URI endpoint
const MONGOOSE_URI = 'mongodb://localhost:27017/class05';
mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true })
  .then(() => categories.deleteAll())
  .then(() => {
    console.log(`Adding categories...`);
    return categories.create(categoryOne);
  })
  .then(savedCategory => {
    console.log(`Added category: ${savedCategory}`);
    catOneId = savedCategory._id;
    return categories.create(categoryTwo);
  })
  .then(savedCategory => {
    console.log(`Added category: ${savedCategory}`);
    catTwoId = savedCategory._id;
    return categories.get();
  })
  .then(allCategories => {
    console.log(`All categories: ${allCategories.results}`);
    console.log(`Updating category...`);
    return categories.update(catOneId, {name: 'Updated Category One'});
  })
  .then(() => categories.get(catOneId))
  .then(updatedCategory => {
    console.log(`Updated category: ${updatedCategory}`);
    console.log(`Deleting category...`);
    return categories.delete(catOneId);
  })
  .then(() => categories.get())
  .then(allCategories => {
    console.log(`All categories: ${allCategories.results}`);
  })
  .then(() => mongoose.disconnect())
  .catch(console.error);
