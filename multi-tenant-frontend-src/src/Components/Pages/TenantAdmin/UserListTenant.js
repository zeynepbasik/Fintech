import { Modal, Switch, TablePagination } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import React, { useRef } from "react";
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Table, Form } from "react-bootstrap";


function UserListTenant() {
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [show, setShow] = useState(false);
  const tenantName = localStorage.getItem("CompanyName");

  const getter = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "api/app/company-admin-services/users",
        {
          headers: {
            "Content-Type": "application/json",
            __tenant : tenantName
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

  useEffect(() => {
    getter();
  }, []);

  // const list = getCompanyAdmins.getter().then((res) =>res)
  // console.log(list)
  // let filterData = list;
  // console.log(typeof(filterData))

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

  const onChangeSwitch=()=>{

  }
  

  const activateUser = async (id) => {
    if(window.confirm("are you sure change the status of this user?")){
      try {
      const response = await axios.put(
        process.env.REACT_APP_API_URL + `api/app/company-admin-services/${id}/user-active`,id, {
          headers: 
          {
            __tenant: tenantName
          }
        }
      ).then((response) => {
        console.log(response)
        console.log(response.data.message);
        setIsPending(true);
      });
      return JSON.stringify(response.data);
    } catch (err) {
      console.log(err);
    }}
    else{

    }
    
  };


  const [isPending, setIsPending] = useState(false);

  const handleDeleteUser = async (id) => {
    console.log(id)
    if(window.confirm("are you sure delete this user?")){ try {
      const response = await axios.delete(
        process.env.REACT_APP_API_URL + `api/app/company-admin-services/users?id=${id}`, {
          headers: 
          {
            __tenant: tenantName
          }
        }
      ).then((response) => {
        console.log(response)
        console.log(response.data.message);
        setIsPending(true);
      });
      return JSON.stringify(response.data);
    } catch (err) {
      console.log(err);
    }}
    else{

    }
  }
  useEffect(()=>{
    if(isPending){
    getter()
    setIsPending(false)
    }
  }, [isPending])

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Users table',
    sheet: 'Users'
})
  return (<>
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
                      <Switch
                      onChange={onChangeSwitch}
                      inputProps={{ "aria-label": "controlled" }}
                      name="isActive"
                      onClick={() => {
                        activateUser(each.id);
                      }}
                      checked = {each.isActive}
                      />
                      <button  onClick={() => {
                        handleDeleteUser(each.id);
                      }}>x</button>
                  </td>
                </tr>
              ))
          ) : (
            <></>
          )}
        </tbody>
      </Table>
      <button onClick={onDownload}> Download </button>
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
    </div>
  </>);
}

export default UserListTenant;