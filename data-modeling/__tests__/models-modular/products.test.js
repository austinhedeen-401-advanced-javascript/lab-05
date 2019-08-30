const Products = require('../../models-modular/products/products.js');
let products = new Products();

const supergoose = require('../supergoose.js');

beforeEach(() => {
  return products.deleteAll();
});

describe('Products Model (Modular)', () => {

  const testProduct = {
    name: 'Test Product',
    description: 'A product for testing.'
  };

  it('can create() a new product', () => {
    expect.assertions(Object.keys(testProduct).length);
    return products.create(testProduct)
      .then(savedProduct => {
        Object.keys(testProduct).forEach(key => {
          expect(savedProduct[key]).toEqual(testProduct[key]);
        });
      });
  });

  it('can get() a product', () => {
    expect.assertions(Object.keys(testProduct).length);
    return products.create(testProduct)
      .then(savedProduct => products.get(savedProduct._id))
      .then(retrievedProduct => {
        Object.keys(testProduct).forEach(key => {
          expect(retrievedProduct[key]).toEqual(testProduct[key]);
        });
      });
  });

  it('can get() all products', () => {
    expect.assertions(1);
    return products.create(testProduct)
      .then(() => products.create(testProduct))
      .then(() => products.get())
      .then(retrievedProducts => {
        expect(retrievedProducts['count']).toEqual(2);
      });
  });

  it('can update() a product', () => {
    expect.assertions(1);
    const updates = {name: 'Updated Product'};
    return products.create(testProduct)
      .then(savedProduct => products.update(savedProduct._id, updates))
      .then(originalProduct => products.get(originalProduct._id))
      .then(updatedProduct => {
        expect(updatedProduct['name']).toEqual(updates['name']);
      });
  });

  it('can delete() a product', () => {
    expect.assertions(1);
    return products.create(testProduct)
      .then(savedProduct => products.delete(savedProduct._id))
      .then(deletedProduct => products.get(deletedProduct._id))
      .then(retrievedProduct => {
        expect(retrievedProduct).toBeNull();
      });
  });

});
