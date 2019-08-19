'use strict';

const mongooseModel = require('./categories-schema');

// Spec: You must implement the following model interface methods: get() create() update() delete()
// TODO - Could this be a static class? Class instances don't appear to be necessary.
class Categories {

  constructor() {
  }

  get(_id) {
    // If 1, return it as a plain object
    // If 2, return it as an object like this:
    // { count: ##, results: [{}, {}] }
    if (_id) {
      return mongooseModel.findById(_id);
    }

    return mongooseModel.find()
      .then(results => ({ count: results.length, results }))
      .catch(error => Promise.reject(new Error(error)));
  }

  create(record) {
    const newRecord = new mongooseModel(record);
    return newRecord.save();
  }

  update(_id, record) {
    return mongooseModel.findByIdAndUpdate(_id, record);
  }

  delete(_id) {
    return mongooseModel.findByIdAndDelete(_id);
  }

  deleteAll() {
    return mongooseModel.deleteMany({});
  }

}

module.exports = Categories;
