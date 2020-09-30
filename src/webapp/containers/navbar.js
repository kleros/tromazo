import React from "react";
import { connect } from "react-redux";

import types from "~/types";
import { pick } from "~/utils";

import image from "../images/logo.png";

class Navbar extends React.Component {
  onSelect(network) {
    this.props.dispatch({
      type: types.setNetwork,
      network,
    });
  }

  render() {
    return (
      <div className="navbar">
        <div className="navbar-logo">
          <a
            href="https://tromazo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1 className="hidden-xs">Tromazo</h1>
            <a
              href="https://kleros.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={image}
                alt="Kleros logo"
                height="24"
                style={{ position: "relative", top: "-10px" }}
              />
            </a>
          </a>
        </div>
      </div>
    );
  }
}

export default connect(pick(["network"]))(Navbar);
