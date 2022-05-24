import React, { Component } from "react";
// import Typewriter from 'typewriter-effect'
import Typewriter from "react-typewriter-effect";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default class Home extends Component {
  render() {
    return (
      <div className="bg">
        <div className="home-text">
          Land Registry
          <br /> Application
          <div className="typewriter">
            {/* Trustable, Transparent and Digitized Platform
            <br />
            Open for all! Register Now. */}
            <Typewriter
              cursorColor="#fff"
              multiText={[
                "Trustable, Transparent and Digitized Platform",
                "Open for all! Register Now.",
              ]}
            />
          </div>
          <hr
            style={{
              border: "8px solid #fff",
              width: "150px",
              marginLeft: "0px",
            }}
          />
        </div>
        <div className="home-button">
          <button
            style={{ marginRight: "15px" }}
            onClick={() => this.props.history.push("/signup")}
          >
            Register
          </button>{" "}
          <button onClick={() => this.props.history.push("/login")}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
