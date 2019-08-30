'use strict';

const mongooseModel = require('./products-schema');

class Products {

  constructor() {
  }

  get(_id) {
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

module.exports = Products;
