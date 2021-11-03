import React, { Component } from "react";
import { CircularProgress, Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },

  form: {
    width: "100%",
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: "#000",
  },
  link: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        email: "",
        password: "",
      },
      loading: false,
    };
  }
  onChange = (e) => {
    const { name, value } = e.target;
    const { users } = this.state;
    this.setState({
      ...this.state,
      users: {
        ...users,
        [name]: value,
      },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const users = this.state.users;
    let data = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : [];

    let validUser = data.filter((user) => {
      return user.userName === users.email && user.password === users.password;
    });
    if (validUser.some((x) => x)) {
      localStorage.setItem("loggedin", "true");
      this.setState({
        ...this.state,
        loading: true,
      });

      this.props.history.push("/homepage");
      return true;
    } else {
      alert("Enter valid username and password.");
      return false;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                onChange={this.onChange}
                autoFocus
                value={this.state.email}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={this.onChange}
                autoComplete="current-password"
                value={this.state.password}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {this.state.loading && <CircularProgress size={14} />}
              {!this.state.loading && "Log in"}
            </Button>
          </form>
          <Link className={classes.link} component={RouterLink} to="/">
            Register
          </Link>
        </Paper>
      </main>
    );
  }
}
export default withStyles(styles)(Login);
