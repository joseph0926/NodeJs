const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      console.log("error!");
      return cb([]);
    } else {
      cb(JSON.parse(data));
    }
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex((product) => {
          return product.id === this.id
        })
        const updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => {
        return p.id === id
      });
      cb(product);
    })
  }
}