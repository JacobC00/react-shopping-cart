//change

import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "default",
    };
  }
  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
    product.disabled = false;
    console.log(localStorage.getItem("localQuantity" + product._id));
    console.log(product.disabled);
    window.location.reload(false);
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        if (
          product.quantity <=
          localStorage.getItem("localQuantity" + product._id)
        ) {
        } else {
          item.count++;
        }
        localStorage.localQuantity++;
        let localQuantity = localStorage.getItem("localQuantity" + product._id);
        localQuantity++;
        localStorage.setItem("localQuantity" + product._id, localQuantity);

        console.log(localStorage.getItem("localQuantity" + product._id));
        alreadyInCart = true;
        if (
          product.quantity <=
          localStorage.getItem("localQuantity" + product._id)
        ) {
          product.disabled = true;
        } else {
          product.disabled = false;
        }
        console.log(product.disabled);
      }
    });
    if (!alreadyInCart) {
      cartItems.push({
        ...product,
        count: 1,
      });
      localStorage.setItem("localQuantity" + product._id, 1);
      localStorage.setItem("disabled" + product._id, false);
      console.log(localStorage.getItem("localQuantity" + product._id));
      console.log(localStorage.getItem("disabled" + product._id));
      if (
        product.quantity <= localStorage.getItem("localQuantity" + product._id)
      ) {
        product.disabled = true;
      } else {
        product.disabled = false;
      }
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  // sortProducts = (event) => {
  //   // impl
  //   const sort = event.target.value;
  //   console.log(event.target.value);
  //   this.setState((state) => ({
  //     sort: sort,
  //     products: this.state.products
  //       .slice()
  //       .sort((a, b) =>
  //         sort === "lowest"
  //           ? a.price > b.price
  //             ? 1
  //             : -1
  //           : sort === "highest"
  //           ? a.price < b.price
  //             ? 1
  //             : -1
  //           : a._id < b._id
  //           ? 1
  //           : -1
  //       ),
  //   }));
  // };

  sortProducts = (event) => {
    //impl
    console.log(event.target.value);
    const sort = event.target.value;
    if (sort === "default") {
      this.setState((state) => ({
        sort: sort,
        products: this.state.products
          .slice()
          .sort((a, b) =>
            a.x === b.x
              ? a.y === b.y
                ? a.z > b.z
                  ? 1
                  : -1
                : a.y > b.y
                ? 1
                : -1
              : a.x > b.x
              ? 1
              : -1
          ),
      }));
    } else if (sort === "lowest") {
      this.setState((state) => ({
        sort: sort,
        products: this.state.products
          .slice()
          .sort((a, b) => (a.price > b.price ? 1 : -1)),
      }));
    } else if (sort === "highest") {
      this.setState((state) => ({
        sort: sort,
        products: this.state.products
          .slice()
          .sort((a, b) => (a.price < b.price ? 1 : -1)),
      }));
    }
  };

  defaultSort = (sort) => {
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          a.x === b.x
            ? a.y === b.y
              ? a.z > b.z
                ? 1
                : -1
              : a.y > b.y
              ? 1
              : -1
            : a.x > b.x
            ? 1
            : -1
        ),
    }));
  };

  filterProducts = (event) => {
    //impl
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, product: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.type.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  render() {
    if (this.state.sort === "default") {
      this.defaultSort();
    }
    return (
      <div className="grid-container">
        <header>
          <a href="/">SW Minifigures</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                cartItems={this.state.cartItems}
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>Wszelkie prawa zastrzeżone.</footer>
      </div>
    );
  }
}

export default App;
