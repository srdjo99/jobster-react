import React, { useState, ReactElement, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { RootState } from "../../store";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

interface IUserData {
  name?: string;
  email?: string;
  lastName?: string;
  location?: string;
}

const Profile = (): ReactElement => {
  const { isLoading, user } = useSelector((store: RootState) => store.user);

  const dispatch = useDispatch();

  const [userData, setUserData] = useState<IUserData>({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error("please fill out all fields");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
