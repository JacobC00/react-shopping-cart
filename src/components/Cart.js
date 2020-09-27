import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
      textToCopy: "",
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clearOrder = () => {
    localStorage.setItem("cartItems", []);
    window.location.reload(false);
  };
  createCopy = (cartItems) => {
    let text = "";
    cartItems.forEach((item) => {
      text +=
        item.count +
        "x " +
        item._id +
        " " +
        item.title +
        " " +
        formatCurrency(item.price) +
        " " +
        text.split("\n");
    });
    text +=
      "Wartość zamówienia: " +
      formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0));
    this.setState({ textToCopy: text });
    this.copyToClipboard(text);
  };
  copyToClipboard = (text) => {
    console.log(text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  render() {
    const { cartItems } = this.props;
    // const textToCopy = this.state.textToCopy;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header"> Zamówienie jest puste </div>
        ) : (
          <div className="cart cart-header">
            Masz {cartItems.length} pozycj
            {cartItems.length < 5 ? (cartItems.length > 1 ? "e" : "ę") : "i"} w
            zamówieniu
            <button
              className="clear-order button"
              onClick={() => this.clearOrder()}
            >
              x
            </button>
          </div>
        )}

        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div className="max-width">
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}{" "}
                        <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          Usuń
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Suma:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                      this.createCopy(cartItems);
                    }}
                    className="button primary"
                  >
                    Stwórz zamówienie
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="ins">
                    <p>
                      Dziękujemy za utworzenie zamówienia! Skopiuj proszę
                      poniższy tekst do wiadomości prywatnej lub w komentarzu
                      pod postem :)
                    </p>
                  </div>
                  <div className="cart order-items">
                    <ul className="cart-items">
                      {cartItems.map((item) => (
                        <li key={item._id}>
                          <div className="max-width">
                            <div>
                              {item.count}x {item._id} {item.title}{" "}
                              {formatCurrency(item.price)}
                            </div>
                          </div>
                        </li>
                      ))}
                      <p>
                        Wartość zamówienia:{" "}
                        {formatCurrency(
                          cartItems.reduce((a, c) => a + c.price * c.count, 0)
                        )}
                      </p>
                      {/* <button
                        className="button"
                        onClick={() => this.copyToClipboard(textToCopy)}
                      >
                        Skopiuj do schowka
                      </button> */}
                    </ul>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
