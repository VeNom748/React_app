import React, { useState, useContext } from "react";
import loginpic from "../Images/loginpic.jpg";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../App";

export const Login = () => {

  const History = useHistory();
  const { dispatch } = useContext(userContext);

  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  // Login
  const PostInfo = async (e) => {
    
    e.preventDefault();

    try {
      const res = await fetch("/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Email,
          password: Password,
        }),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        window.alert(`${data.message}`);
      } else {
        window.alert(`${data.message} || ${data.name}`);
        dispatch({ type: "USER", payload: true });
        History.push("/");
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="container fixed-height d-flex justify-content-center align-items-center">
        <div className="w-75 d-flex shadow p-5 background login-card">
          <div className="reg-form-img w-50 d-flex flex-column justify-content-center align-items-center">
            <img src={loginpic} className="w-75" alt="" />
            <Link to="/sign-up" className="text-primary">
              Create an Account
            </Link>
          </div>
          <div className="w-50 ps-5 d-flex justify-content-center flex-column ">
            <h1 className="fw-bold">Sign In</h1>
            <form method="POST" className="reg-form d-flex flex-column mt-2">
              <div className="inputs">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  name="email"
                  value={Email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Your Email"
                />
              </div>

              <div className="inputs">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  value={Password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
              </div>

              <div className="inputs">
                <input
                  type="submit"
                  onClick={PostInfo}
                  className="btn btn-primary mt-3 pe-3 ps-3 pt-2 pb-2"
                  value="Log in"
                  name="login"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
