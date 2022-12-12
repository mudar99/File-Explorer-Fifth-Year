import { React, useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./log.scss";
import { logsGet } from "../API";
import axios from "axios";
import { Paginator } from "primereact/paginator";
import NavBar from "../NavigationBar/NavBar";
import { showError } from "../ToastService/ToastService";
import { Toast } from "primereact/toast";

const Log = () => {
  const [logs, setLogs] = useState([]);
  const [, setTotalPages] = useState([]);
  const [deatilsShow, setDeatilsShow] = useState();
  const [totalItems, setTotalItems] = useState(1);
  const toast = useRef(null);

  useEffect(() => {
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(logsGet + "?page=1&size=10", axios.defaults.headers)
      .then((res) => {
        if (res.data.status === true) {
          console.log(res.data);
          setTotalPages(res.data.data.totalPages);
          setLogs(res.data.data.logs);
          setTotalItems(res.data.data.totalItems);
        }
      })
      .catch((err) => {
        console.error(err);
        showError(err.response.status, err.response.data.message, toast);
      });
  }, []);

  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(10);
  const [, setCurrentPage] = useState(1);

  const onBasicPageChange = (event) => {
    let currentPage = event.page;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    axios
      .get(logsGet + "?page=" + currentPage + "&size=10")
      .then((res) => {
        console.log(logsGet + "?page=" + currentPage);
        if (res.data.status === true) {
          console.log(res.data);
          setTotalPages(res.data.data.totalPages);
          setLogs(res.data.data.logs);
          setTotalItems(res.data.data.totalItems);
        }
      })
      .catch((err) => console.error(err));
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <span>
          <div
            className={
              deatilsShow !== undefined && deatilsShow.rowData.id === rowData.id
                ? "responseBodyShow"
                : "responseBody"
            }
          >
            {rowData.responseBody}
          </div>
        </span>
      </>
    );
  };
  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <NavBar location="logs" />
      <div className="log">
        <DataTable
          selectionMode="single"
          cellSelection
          selection={deatilsShow}
          onSelectionChange={(e) => setDeatilsShow(e.value)}
          stripedRows
          value={logs}
          responsiveLayout="scroll"
          rows={10}
        >
          <Column align="center" field="id" header="ID"></Column>
          <Column align="center" field="method" header="Method"></Column>
          <Column
            align="center"
            field="requestBody"
            header="Request Body"
          ></Column>
          <Column
            align="center"
            field="responseBody"
            header="responseBody"
            body={statusBodyTemplate}
          ></Column>
          <Column align="center" field="uri" header="Uri"></Column>
          <Column align="center" field="time" header="Time"></Column>
          <Column
            className="text-success"
            align="center"
            field="statusCode"
            header="Status Code"
          ></Column>
        </DataTable>
        <Paginator
          first={basicFirst}
          rows={basicRows}
          totalRecords={totalItems}
          onPageChange={onBasicPageChange}
        ></Paginator>
      </div>
    </>
  );
};

export default Log;
