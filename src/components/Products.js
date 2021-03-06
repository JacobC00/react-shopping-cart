import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  openModal = (product) => {
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;

    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                {product.quantity === 0 ? (
                  <div className="product out-of-stock">
                    <a href={"#" + product._id} className="a-disabled">
                      <img src={product.image} alt={product.title}></img>
                      <p className="product-title">{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>

                      <button
                        onClick={() => {
                          this.props.addToCart(product);
                        }}
                        disabled="disabled"
                        className="button primary button-disabled"
                      >
                        Dodaj
                      </button>
                    </div>
                    <div className="product-quantity">Out of Stock</div>
                  </div>
                ) : (
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() => this.openModal(product)}
                    >
                      <img src={product.image} alt={product.title}></img>
                      <p className="product-title">{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>

                      <button
                        onClick={() => {
                          this.props.addToCart(product);
                        }}
                        disabled={product.disabled === true ? "disabled" : ""}
                        className={
                          product.disabled === true
                            ? "button primary button-disabled"
                            : "button primary"
                        }
                      >
                        Dodaj
                      </button>
                    </div>
                    {product.quantity > 1 ? (
                      <div className="product-quantity">
                        Dostępna ilość: {product.quantity}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Fade>

        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt="product.title"></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>Dostępna ilość: {product.quantity}</p>
                  Położenie figurki: {product.place}
                  <br />
                  (x.y.z: x-płytka, y-rząd, z-kolumna)
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Dodaj do zamówienia
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
