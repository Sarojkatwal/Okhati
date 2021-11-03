import React, { Component } from "react";

export class NotFound extends Component {
  render() {
    this.props.history.push("/");
    return <div></div>;
  }
}

export default NotFound;
