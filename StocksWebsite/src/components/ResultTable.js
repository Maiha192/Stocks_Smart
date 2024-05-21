// Import necessary dependencies
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Badge } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

// Initiate column features for the ResultTable component
const columns = [
  {
    headerName: "Symbol",
    field: "symbol",
    sortable: true,
    filter: true,
    width: 100,
  },
  { headerName: "Company Name", field: "name", sortable: true, filter: true },
  { headerName: "Industry", field: "industry", sortable: true, filter: true },
];

// ResultTable component
export function ResultTable({ rowData, rowCount }) {
  const navigate = useNavigate();

  // Function to handle event when user clicks row
  const handleRowClick = (data) => {
    const dataToPass = {
      company: data.name,
      industry: data.industry,
    };

    // Maintain same state when navigate to the Charts page
    navigate("/charts", { state: { ...dataToPass } });
  };

  return (
    <div>
      <p>
        <Badge color="black" className="badge">
          {rowCount}
        </Badge>{" "}
        results
      </p>
      <div
        className="ag-theme-balham"
        style={{
          height: "580px",
          width: "500px",
          textAlign: "left",
          margin: "0 auto",
        }}
      >
        <AgGridReact
          onRowClicked={({ data }) => {
            handleRowClick(data);
          }}
          rowData={rowData}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={18}
        />
      </div>
    </div>
  );
}
