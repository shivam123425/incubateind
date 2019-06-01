import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import "./App.css";

class App extends Component {
  state = {
    chargerType: "Private Fast",
    success: false
  };
  onChangeSelect = event => {
    this.setState({
      chargerType: event.target.value
    });
  };
  handleForm = event => {
    event.preventDefault();
    fetch("", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude,
        chargerType: this.state.chargerType
      })
    })
      .then(res => res.json())
      .then(resp => {
        if (resp.success) {
          this.setState({
            success: true
          });
        }
      })
      .catch(console.log);
  };
  render() {
    let content = "";
    if (!this.props.isGeolocationAvailable) {
      content = <p>Your browser does not support Geolocation</p>;
    } else if (!this.props.isGeolocationEnabled) {
      content = <p>Geolocation is not enabled</p>;
    } else {
      content = (
        <form onSubmit={this.handleForm}>
          <select
            name="chargerType"
            required={true}
            onChange={this.onChangeSelect}
          >
            <option value="Private Fast">Private Fast</option>
            <option value="Private Slow">Private Slow</option>
            <option value="Public Fast">Public Fast</option>
            <option value="Public Slow">Public Slow</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      );
    }
    return <div className="App">{content}</div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App);
