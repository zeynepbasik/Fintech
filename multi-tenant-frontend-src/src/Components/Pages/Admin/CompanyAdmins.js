// import {Table} from "material-ui/Table"
// import {TableRowColumn} from "material-ui/Table"
// import {TableRow} from "material-ui/Table"
import React from "react";
import { useRef } from "react";
import { Table, Form } from "react-bootstrap";
import { Modal, TablePagination } from "@material-ui/core";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useState, useEffect } from "react";
import axios from "axios";
import UpdateForm from "../UsersManagement/UpdateForm/UpdateForm";

const CompanyAdmins = () => {
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");
  const MyLink = React.forwardRef((props, ref) => (
    <UpdateForm
      id={userId}
      show={show}
      openHandle={openHandle}
      closeHandle={closeHandle}
      innerRef={ref}
      {...props}
    />
  ));

  const getter = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "api/app/inactive-user-management/inactive-user-list",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setList([...response.data]);
      setDisplayList([...response.data]);

      return JSON.stringify(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const openHandle = (id) => {
    setShow(!show);
    setUserId(id);
  };

  const closeHandle = () => {
    setShow(!show);
  };

  useEffect(() => {
    getter();
  }, []);

  const searchInput = document.querySelector(".search-area");

  const findTheMatch = (word, list) => {
    return list.filter((user) => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(word, "gi");
      return (
        user.userName?.match(regex) ||
        user.email?.match(regex) ||
        user.phoneNumber?.match(regex)
      );
    });
  };
  function displayMatches(e) {
    const matchArray = findTheMatch(e.target.value, list);
    setDisplayList(matchArray);
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,

    filename: "Users table",

    sheet: "Users",
  });
  return (
    <>
      <div className="table-responsive">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="search-area me-2"
            aria-label="Search"
            onKeyUp={displayMatches}
          />
        </Form>
        <Table className="table" size="sm" id="tableUserList" ref={tableRef}>
          <thead>
            <tr>
              <th scope="col" className="table-item">
                User name
              </th>
              <th scope="col" className="table-item">
                Email
              </th>
              <th scope="col" className="table-item">
                Phone
              </th>
              <th scope="col" className="table-item">
                Is active
              </th>
              <th scope="col" className="table-item">
                Option
              </th>
            </tr>
          </thead>
          <tbody>
            {displayList?.length > 0 ? (
              displayList
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((each, index) => (
                  <tr key={index}>
                    <td scope="row" className="table-item">
                      {each.userName}
                    </td>
                    <td className="table-item">{each.email}</td>
                    <td className="table-item">{each.phoneNumber}</td>
                    <td className="table-item">{each.roles}</td>
                    <td>
                      <button
                        style={{ background: "none" }}
                        className="table-button"
                        onClick={() => {
                          openHandle(each.id);
                        }}
                      >
                        EDIT USER
                      </button>
                      <Modal
                        open={show}
                        onClose={() => setShow(!show)}
                        color="white"
                      >
                        <MyLink />
                      </Modal>
                    </td>
                  </tr>
                ))
            ) : (
              <></>
            )}
          </tbody>
        </Table>
        <TablePagination
          className="pagination"
          rowsPerPageOptions={[1, 2, 5]}
          component="div"
          count={displayList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <button onClick={onDownload}> Download </button>
      </div>
      <form>{/* kullanıcı üretme */}</form>
    </>
  );
};

export default CompanyAdmins;
