import React, { FC, useState, useEffect, ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Logo, FormRow } from "../components";

import Wrapper from "../assets/wrappers/RegisterPage";
import { loginUser, registerUser } from "../features/user/userSlice";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

interface IStoreState {
  user: any;
  isLoading: boolean;
}

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register: FC = (): ReactElement => {
  const [values, setValues] = useState(initialState);

  const { user, isLoading } = useSelector((store: IStoreState) => store.user);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const { name, email, password, isMember } = values;
    // eslint-disable-next-line
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please provide fill out all fields");
      return;
    }
    if (isMember) {
      void dispatch(loginUser({ email, password }));
      return;
    }
    void dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = (): void => {
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
