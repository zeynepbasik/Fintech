import { Modal, Switch } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateThunk } from "../../../../Store/auth.js";
import "../../Admin/CompanyAdmins.css";
const UpdateForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { id, closeHandle } = props;

  const [userInfo, setUserInfo] = useState({
    id,
    tenant: "",
    active: true,
  });

  console.log(props);
  const dispatch = useDispatch();
  let urlencoded = new URLSearchParams();

  urlencoded.append("id", userInfo.id);
  urlencoded.append("tenant", userInfo.tenant);
  urlencoded.append("active", userInfo.isActive);

  const body = {
    Id: userInfo.id,
    Tenant: userInfo.tenant,
    Active: userInfo.isActive,
  };

  const onChange = (e) => {
    console.log(e);
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeSwitch = (e) => {
    console.log(e);
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    dispatch(updateThunk(body))
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log(response.data.message);
          closeHandle();
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="overlay">
      <form className="form-container" onSubmit={onSubmit}>
        <label name="companyName">
          <b>Add New User {id}</b>
        </label>
        <div>
          <input
            type="text"
            placeholder="Enter Company Name"
            name="tenant"
            onChange={onChange}
            required
          />
          <Switch
            onChange={onChangeSwitch}
            inputProps={{ "aria-label": "controlled" }}
            name="isActive"
          />
        </div>
        <button type="submit" className="btn" disabled={isLoading}>
          Submit
        </button>
        <button
          type="button"
          className="btn cancel"
          disabled={isLoading}
          onClick={closeHandle}
        >
          Close
        </button>
      </form>
    </div>
  );
};
export default UpdateForm;
