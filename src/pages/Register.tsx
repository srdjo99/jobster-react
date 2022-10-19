import React, { FC, useState, useEffect, ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Logo, FormRow } from "../components";

import Wrapper from "../assets/wrappers/RegisterPage";
import { loginUser, registerUser } from "../features/user/userSlice";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRTK";
import { IUserData } from "../types/IUser";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register: FC = () => {
  const [values, setValues] = useState(initialState);

  const { user, isLoading } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;
    // eslint-disable-next-line
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please provide fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({
                email: process.env.REACT_APP_TESTUSER_EMAIL,
                password: process.env.REACT_APP_TESTUSER_PASSWORD,
              }),
            );
          }}
        >
          {isLoading ? "loading..." : "demo app"}
        </button>
        <p>
          {values.isMember ? "Not a member yet? " : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
