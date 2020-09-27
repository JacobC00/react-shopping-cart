import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">
          {this.props.count} Pozycj
          {this.props.count === 1
            ? "a"
            : this.props.count === 0
            ? "i"
            : this.props.count < 5
            ? "e"
            : "i"}
        </div>
        <div className="filter-sort">
          Sortuj{" "}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option selected="selected" value="default">
              Domyślnie
            </option>
            <option value="lowest">od najtańszych</option>
            <option value="highest">od najdroższych</option>
          </select>
        </div>
        <div className="filter-size">
          Filtruj{" "}
          <select value={this.props.size} onChange={this.props.filterProducts}>
            <option value="All">Wszystko</option>
            <option value="Clone">Clone</option>
            <option value="Stormtrooper">Stormtrooper</option>
            <option value="Jedi">Jedi</option>
            <option value="Sith">Sith</option>
            <option value="Droid">Droid</option>
          </select>
        </div>
      </div>
    );
  }
}
