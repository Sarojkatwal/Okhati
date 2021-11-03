import React, { Component } from "react";
import { CircularProgress, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  go = () => {
    this.setState({
      loading: true,
    });
    localStorage.setItem("loggedin", "false");
    this.props.history.push("/");
  };
  render() {
    return (
      <>
        <Typography component="h1" variant="h2" align="center">
          Welcome to the page
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={this.go}
        >
          {this.state.loading && <CircularProgress size={14} />}
          {!this.state.loading && "Click Me"}
        </Button>
      </>
    );
  }
}

export default Homepage;
