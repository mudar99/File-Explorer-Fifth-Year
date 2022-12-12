import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { GetReport } from "../API";
import NavBar from "../NavigationBar/NavBar";

const ShowReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(GetReport, axios.defaults.headers)
      .then((res) => {
        if (res.data.status === true) {
          console.log(res.data);
          setReports(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={
          rowData.barrier === null || rowData.barrier === ""
            ? "text-primary"
            : "text-success"
        }
      >
        {rowData.barrier === null || rowData.barrier === ""
          ? "Not Reserved"
          : rowData.barrier}
      </span>
    );
  };
  return (
    <>
      <NavBar location="reports"/>
      <div className="log">
        <DataTable stripedRows value={reports} responsiveLayout="scroll">
          <Column align="center" field="id" header="File ID"></Column>
          <Column
            align="center"
            field="user.fullName"
            header="Creator"
          ></Column>
          <Column
            align="center"
            field="bookedAt"
            header="Booked At"
            sortable
          ></Column>
          <Column
            align="center"
            field="unbookedAt"
            header="Unbooked At"
            sortable
          ></Column>
          <Column
            align="center"
            field="createdAt"
            header="Created At"
            sortable
          ></Column>
          <Column
            align="center"
            field="updatedAt"
            header="Updated At"
            sortable
          ></Column>
          <Column
            align="center"
            field="barrier"
            header="Reserved By"
            body={statusBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default ShowReport;
