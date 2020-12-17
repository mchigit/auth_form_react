import { useState, Fragment, useEffect } from "react";
import { Card, Menu, Form, Button } from "semantic-ui-react";

import { auth, authUI } from "../firebase";

import "../css/AuthForm.css";

import firebase from "firebase";

async function signUpUser(email, password) {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

async function loginUser(email, password) {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

function renderLoggedIn(logOutFn) {
  return (
    <div className="loggedIn-wrapper">
      <h1>You are logged in!</h1>
      <div>
        <Button onClick={() => auth.signOut()} color="yellow">
          Log out
        </Button>
      </div>
    </div>
  );
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  });

  useEffect(() => {
    if (!user) {
      authUI.start(".google-login", {
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        signInFlow: "redirect",
      });
    }
  }, [user]);

  return (
    <div className="auth-form-wrapper">
      <Card className="auth-form-card">
        <Card.Content>
          {user ? (
            renderLoggedIn()
          ) : (
            <Fragment>
              <Card.Header className="auth-form-header">Auth Form</Card.Header>
              <Menu compact secondary>
                <Menu.Item
                  name="Login"
                  onClick={() => setIsLogin(true)}
                  active={isLogin}
                ></Menu.Item>
                <Menu.Item
                  name="Sign up"
                  onClick={() => setIsLogin(false)}
                  active={!isLogin}
                ></Menu.Item>
              </Menu>
              {isLogin ? (
                <Fragment>
                  <Form>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Email</label>
                      <input
                        placeholder="Email Address"
                        name="loginEmail"
                        type="email"
                        value={loginEmail || ""}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Password</label>
                      <input
                        placeholder="Password"
                        name="loginPassword"
                        type="password"
                        value={loginPassword || ""}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Button
                      onClick={() => loginUser(loginEmail, loginPassword)}
                      className="auth-form-buttons"
                      color="green"
                    >
                      Login
                    </Button>
                  </Form>
                  <div className="google-login"></div>
                </Fragment>
              ) : (
                <Fragment>
                  <Form>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Email</label>
                      <input
                        placeholder="Email Address"
                        name="signUpEmail"
                        type="email"
                        value={signupEmail || ""}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Password</label>
                      <input
                        placeholder="Password"
                        name="signUpPassword"
                        type="password"
                        value={signupPassword || ""}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Button
                      className="auth-form-buttons"
                      color="teal"
                      onClick={() =>
                        signUpUser(signupEmail, signupPassword)
                      }
                    >
                      Sign up
                    </Button>
                  </Form>
                  <div className="google-login"></div>
                </Fragment>
              )}
            </Fragment>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}

export default AuthForm;
