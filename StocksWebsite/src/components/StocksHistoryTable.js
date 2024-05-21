// Import necessary dependencies
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Function to revise timestamp to DD/MM/YYYY format
export const dateFormatter = (params) => {
  if (params.value) {
    const dateParts = params.value.split("-");
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  }
  return "";
};

// Function to revise price to 2 floating points
const priceFormatter = (params) => {
  if (params.value) {
    return Number(params.value).toFixed(2);
  }
};

// Function to revise volumes to XXX,XXX,XXX format
const volumeFormatter = (params) => {
  if (params.value) {
    return Number(params.value).toLocaleString();
  }
};

// Initiate column features for the StocksHistoryTable component
const columns = [
  {
    headerName: "Date",
    field: "timestamp",
    sortable: true,
    filter: true,
    valueFormatter: dateFormatter,
    width: 150,
  },
  {
    headerName: "Open",
    field: "open",
    sortable: true,
    filter: true,
    valueFormatter: priceFormatter,
    width: 150,
  },
  {
    headerName: "High",
    field: "high",
    sortable: true,
    filter: true,
    valueFormatter: priceFormatter,
    width: 150,
  },
  {
    headerName: "Low",
    field: "low",
    sortable: true,
    filter: true,
    valueFormatter: priceFormatter,
    width: 150,
  },
  {
    headerName: "Close",
    field: "close",
    sortable: true,
    filter: true,
    valueFormatter: priceFormatter,
    width: 150,
  },
  {
    headerName: "Volumes",
    field: "volumes",
    sortable: true,
    filter: true,
    valueFormatter: volumeFormatter,
    width: 150,
  },
];

// StocksHistoryTable component
export function StocksHistoryTable({ rowData }) {
  return (
    <div>
      <div
        className="ag-theme-balham"
        style={{
          height: "370px",
          width: "900px",
          textAlign: "left",
          margin: "0 auto",
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}
