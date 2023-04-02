import React, { useState, useEffect } from "react";
import UserService from "../../../Services/user.service";
const TenantAdmin = () => {
  // const [content, setContent] = useState("");
  // useEffect(() => {
  //   UserService.getTenantAdminBoard().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       setContent(_content);
  //     }
  //   );
  // }, []);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Tenant Admin Page</h3>
      </header>
    </div>
  );
};
export default TenantAdmin;