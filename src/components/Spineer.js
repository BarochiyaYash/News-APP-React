import React, { Component } from "react";


export class Spineer extends Component {
  render() {
    return (
      <div className="text-center my-5">
        <button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
          <br></br>
          <span role="status">Loading...</span>
        </button>
      </div>
    );
  }
}

export default Spineer;
