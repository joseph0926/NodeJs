const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart, _id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = _id;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("유저 추가 성공!");
      })
      .catch((err) => console.log(err))
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQty = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQty = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQty;
    } else {
      updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQty });
    }

    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db.collection("users").updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db.collection("users").updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: updatedCartItems } } });
  }

  addOrder() {
    const db = getDb();
    return db
      .collection("orders")
      .insertOne(this.cart)
      .then((result) => {
        this.cart = { items: {} };
        return db.collection("users").updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: [] } } });
      });
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new mongodb.ObjectId(userId) });
  }
}

module.exports = User;
