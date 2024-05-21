// Import necessary dependencies
import { useData } from "../apis/api";
import { ResultTable } from "./ResultTable";
import React, { useState } from "react";
import { Spinner } from "reactstrap";
import TableHeader from "./TableHeader";
import "../App.css";

// StockSummary component
export default function StockSummary() {
  const URL =
    "https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/";

  const [searchStock, setSearchStock] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");

  // Fetch data from API
  const {
    data: allData,
    loading: allLoading,
    error: allError,
  } = useData(`${URL}all`);

  if (!allData) return null;

  // Display Spinner while loading
  if (allLoading) {
    return (
      <div className="spinner-container">
        <Spinner className="spinner" color="dark" />
      </div>
    );
  }

  // Display error message
  if (allError) {
    const errorMessage = allError ? allError.message : "No data found";

    return (
      <div className="text-center">
        <TableHeader
          setSearchStock={setSearchStock}
          setSearchCompany={setSearchCompany}
          setSearchIndustry={setSearchIndustry}
        />
        <p className="error-container">Error: {errorMessage}!</p>
      </div>
    );
  }

  // Filter data corresponding to users input on Stock symbol search bar
  const filteredStockData = allData.filter((item) =>
    item.symbol?.toLowerCase().includes(searchStock.toLowerCase())
  );

  // Filter data corresponding to users input on Company name search bar
  const filteredCompanyData = allData.filter((item) =>
    item.name?.toLowerCase().includes(searchCompany.toLowerCase())
  );

  // Filter data corresponding to users input on Industry search bar
  const filteredIndustryData = allData.filter((item) =>
    item.industry?.toLowerCase().includes(searchIndustry.toLowerCase())
  );

  // Conditional display result table with filtered data corresponding to users input in a search bar
  return (
    <div className="text-center">
      <TableHeader
        setSearchStock={setSearchStock}
        setSearchCompany={setSearchCompany}
        setSearchIndustry={setSearchIndustry}
      />
      {filteredStockData && searchStock ? (
        <ResultTable
          rowData={filteredStockData}
          rowCount={filteredStockData.length}
        />
      ) : filteredCompanyData && searchCompany ? (
        <ResultTable
          rowData={filteredCompanyData}
          rowCount={filteredCompanyData.length}
        />
      ) : filteredIndustryData && searchIndustry ? (
        <ResultTable
          rowData={filteredIndustryData}
          rowCount={filteredIndustryData.length}
        />
      ) : (
        <ResultTable rowData={allData} rowCount={allData.length} />
      )}
    </div>
  );
}
