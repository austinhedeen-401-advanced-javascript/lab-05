'use strict';

const mongoose = require('mongoose');

// Spec: This needs 2 fields: name (required) and description, both strings
const categories = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

// Do we need to run any lifecycle hooks/middleware?

module.exports = mongoose.model('categories ', categories);
