import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function CreateUser() {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const body = {
    userName: userInfo.userName,
    email: userInfo.email,
    password: userInfo.password,
  };

  const onChange = (e) => {
    console.log(e);
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await handleCreateuser(body);
    if (response) {
      toast.success("😎Kullanıcı başarıyla oluşturuldu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const tenantName = localStorage.getItem("CompanyName");

  const handleCreateuser = async (body) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "api/app/company-admin-services/users",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            __tenant: tenantName,
          },
        }
      );
      return JSON.stringify(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={onChange}
          name="userName"
          type="text"
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={onChange}
          name="email"
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateUser;
