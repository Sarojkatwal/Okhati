import React, { Component } from "react";

import Button from "@material-ui/core/Button";
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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  link: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        userName: "",
        password: "",
        confpassword: "",
      },
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    const { users } = this.state;
    this.setState({
      users: {
        ...users,
        [name]: value,
      },
    });
  };

  regis = (users) => {
    let data = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : [];

    //Validation if user already registerd
    let duplicateUser = data.filter((user) => {
      return user.userName === users.userName;
    });
    if (duplicateUser.some((x) => x)) {
      alert('Username "' + users.userName + '" is already taken');
      this.setState({
        users: {
          userName: "",
          password: "",
          confpassword: "",
        },
      });
      return;
    } else {
      data.push(users);
      if (localStorage) {
        localStorage.setItem("user", JSON.stringify(data));
        alert("User Registered Successfully");
        this.props.history.push("/login");
      }
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const users = this.state.users;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(users.userName)) {
      if (
        users.password.trim().length >= 8 &&
        users.password.match(/[a-z]/i) &&
        users.password.match(/[a-z]/i)
      ) {
        if (users.password === users.confpassword) {
          this.regis(users);
        } else {
          alert("Password and Confirm Password don't match ");
        }
      } else {
        alert(
          "Password must be at least 8 characters long and include at least a number and an alphabet"
        );
      }
    } else {
      alert("You haven't entered a valid email address!");
    }

    // this.setState({
    //   users: {
    //     userName: "",
    //     password: "",
    //     confpassword: "",
    //   },
    // });
  };
  render() {
    const { classes } = this.props;
    const { users } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="userName">User Name</InputLabel>
              <Input
                id="userName"
                name="userName"
                onChange={this.onChange}
                autoComplete="userName"
                value={users.userName}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                onChange={this.onChange}
                name="password"
                autoComplete="password"
                value={users.password}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="Confpassword">Confirm Password</InputLabel>
              <Input
                id="confpassword"
                type="password"
                name="confpassword"
                onChange={this.onChange}
                autoComplete="confpassword"
                value={users.confpassword}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>
          </form>
          <Link component={RouterLink} className={classes.link} to="/login">
            Login
          </Link>
        </Paper>
      </main>
    );
  }
}
export default withStyles(styles)(Register);
