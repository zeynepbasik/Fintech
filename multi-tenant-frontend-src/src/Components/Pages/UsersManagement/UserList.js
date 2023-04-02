import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Backdrop,
} from "@material-ui/core";

const [showModal, setShowModal] = useState();
const [list, setList] = useState([]);

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
    console.log(response.data);
    setList([...response.data]);
    return JSON.stringify(response.data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  getter();
});

return (
  <>
    <Table id="hey">
      <TableHead
        sx={{
          top: 0,
          left: 0,
          zIndex: "2",
          position: "sticky",
          backgroundColor: "#bac9d3",
        }}
      >
        <TableRow>
          <TableCell align="left" sx={{ fontWeight: "bold", width: "18%" }}>
            Username
          </TableCell>

          <TableCell align="left" sx={{ fontWeight: "bold", width: "18%" }}>
            Email
          </TableCell>

          <TableCell align="left" sx={{ fontWeight: "bold", width: "16%" }}>
            Phone Number
          </TableCell>

          <TableCell align="left" sx={{ fontWeight: "bold", width: "16%" }}>
            Is Active
          </TableCell>

          <TableCell align="left" sx={{ fontWeight: "bold", width: "16%" }}>
            Option
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list?.length > 0 ? (
          list?.map((each, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                style={{ textTransform: "capitalize" }}
                component="th"
                scope="row"
              >
                {each.userName}
              </TableCell>

              <TableCell align="left">{each.email}</TableCell>

              <TableCell align="left">{each.phoneNumber}</TableCell>

              <TableCell align="left">{each.roles}</TableCell>

              <TableCell align="left">
                <button onclick="./admin"> Edit </button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow></TableRow>
        )}
      </TableBody>
    </Table>
  </>
);
