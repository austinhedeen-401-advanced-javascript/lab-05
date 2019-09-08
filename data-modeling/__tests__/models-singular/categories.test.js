const supergoose = require('../supergoose.js');

const Categories = require('../../models-singular/categories.js');

let categories = new Categories();

beforeEach(() => {
  return categories.deleteAll();
});

describe('Categories Model (Singular)', () => {

  // TODO - handle edge cases
  const testCategory = {
    name: 'Test Category',
    description: 'A category for testing.'
  };

  it('can create() a new category', () => {
    expect.assertions(Object.keys(testCategory).length);
    return categories.create(testCategory)
      .then(savedCategory => {
        Object.keys(testCategory).forEach(key => {
          expect(savedCategory[key]).toEqual(testCategory[key]);
        });
      });
  });

  it('can get() a category', () => {
    expect.assertions(Object.keys(testCategory).length);
    return categories.create(testCategory)
      .then(savedCategory => categories.get(savedCategory._id))
      .then(retrievedCategory => {
        Object.keys(testCategory).forEach(key => {
          expect(retrievedCategory[key]).toEqual(testCategory[key]);
        });
      });
  });

  it('can get() all categories', () => {
    expect.assertions(1);
    return categories.create(testCategory)
      .then(() => categories.create(testCategory))
      .then(() => categories.get())
      .then(retrievedCategories => {
        expect(retrievedCategories['count']).toEqual(2);
      });
  });

  it('can update() a category', () => {
    expect.assertions(1);
    const updates = {name: 'Updated Category'};
    return categories.create(testCategory)
      .then(savedCategory => categories.update(savedCategory._id, updates))
      .then(originalCategory => categories.get(originalCategory._id))
      .then(updatedCategory => {
        expect(updatedCategory['name']).toEqual(updates['name']);
      });
  });

  it('can delete() a category', () => {
    expect.assertions(1);
    return categories.create(testCategory)
      .then(savedCategory => categories.delete(savedCategory._id))
      .then(deletedCategory => categories.get(deletedCategory._id))
      .then(retrievedCategory => {
        expect(retrievedCategory).toBeNull();
      });
  });
});