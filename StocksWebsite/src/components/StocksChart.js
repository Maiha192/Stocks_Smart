// Import necessary dependencies
import React, { useState, useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { useData } from "../apis/api";
import { Spinner } from "reactstrap";
import { useLocation } from "react-router-dom";
import "../App.css";
import { StocksHistoryTable, dateFormatter } from "./StocksHistoryTable";
import { SearchDateBar } from "./SearchDateBar";

// Constant holding list of available industries
const industries = [
  "Consumer Discretionary",
  "Consumer Staples",
  "Energy",
  "Financials",
  "Health Care",
  "Industrials",
  "Information Technology",
  "Materials",
  "Real Estate",
  "Telecommunication Services",
  "Utilities",
];

// Constant holding URL of the API
const URL = "https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/";

// Spinner component for loading state
const SpinnerComponent = () => (
  <div className="spinner-container">
    <Spinner className="spinner" color="dark" />
  </div>
);

// Error component to display error messages
const ErrorComponent = ({ error }) => (
  <div className="spinner-container">
    <p>Error: {error.message}</p>
  </div>
);

// StocksChart component
export default function StocksChart() {
  const location = useLocation();
  const { state } = location;
  const [industry, setIndustry] = useState(state?.industry ?? "");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(state?.company ?? "");
  const [filteredData, setFilteredData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const chartRef = useRef(null);
  const [tableData, setTableData] = useState([]);

  // Fetch data based on pre-selected industry or current selected industry
  const { loading, data, error } = useData(
    industry
      ? `${URL}industry?industry=${encodeURIComponent(industry)}`
      : `${URL}industry?industry=${encodeURIComponent(state?.industry ?? "")}`
  );

  // Function to handle event when industry selection changes
  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
    setSelectedCompany("");
  };

  // Function to handle event when company selection changes
  const handleCompanyChange = (event) => {
    const selectedCompanyName = event.target.value;
    setSelectedCompany(selectedCompanyName);
  };

  // Function to handle date search
  const handleDateSearch = (startDate, endDate) => {
    if (startDate && endDate) {
      const [startDay, startMonth, startYear] = startDate.split("/");
      const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;
      const start = new Date(formattedStartDate);

      const [endDay, endMonth, endYear] = endDate.split("/");
      const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;
      const end = new Date(formattedEndDate);

      const filtered = filteredData.filter((item) => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= start && itemDate <= end;
      });
      setDisplayData(filtered);
    } else {
      setDisplayData(filteredData);
    }
  };

  // Extract unique timestamps for SearchDateBar
  const timestamps = filteredData
    ? Array.from(
        new Set(
          filteredData.map((item) => dateFormatter({ value: item.timestamp }))
        )
      )
    : [];

  // Filter and update data based on selected company or pre-selected company
  useEffect(() => {
    if (data && (selectedCompany || state)) {
      const selectedCompanyName = selectedCompany || state.company;
      const newData = data.filter((item) => item.name === selectedCompanyName);
      newData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setFilteredData(newData);
      setDisplayData(newData);
    } else {
      setFilteredData([]);
      setDisplayData([]);
    }
  }, [data, selectedCompany, state]);

  // Update tableData when displayData changes
  useEffect(() => {
    const reversedData = [...displayData].reverse();
    setTableData(reversedData);
  }, [displayData]);

  // Update list of unique companies when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      const uniqueCompanies = Array.from(
        new Set(data.map((item) => item.name))
      );
      setCompanies(uniqueCompanies);
    } else {
      setCompanies([]);
      setFilteredData([]);
    }
  }, [data]);

  // Create or update the chart when filtered data changes
  useEffect(() => {
    if (displayData.length > 0) {
      if (chartRef.current) {
        chartRef.current.remove();
      }

      const chart = createChart(document.getElementById("candlestick-chart"), {
        width: 900,
        height: 600,
      });

      const candlestickSeries = chart.addCandlestickSeries();
      const chartData = displayData.map((item) => ({
        time: item.timestamp,
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
      }));

      candlestickSeries.setData(chartData);
      chartRef.current = chart;
      chart.timeScale().fitContent();
    } else {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    }
  }, [displayData]);

  // Conditional rendering based on loading state
  if (loading) {
    return <SpinnerComponent />;
  }

  // Conditional rendering based on error state
  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div className="text-center">
      <h3 className="headline">STOCKS CHARTS</h3>
      {/* Select input for industry */}
      <label>
        Industry
        <select
          id="industry-select-box"
          value={industry ?? state.industry}
          onChange={handleIndustryChange}
          className="select-box"
        >
          <option value="">Select an industry</option>
          {industries.map((industryValue, index) => (
            <option key={index} value={industryValue}>
              {industryValue}
            </option>
          ))}
        </select>
      </label>

      {/* Select input for company */}
      <label>
        Company
        <select
          id="company-select-box"
          value={selectedCompany ?? state.company}
          onChange={handleCompanyChange}
          className="select-box"
          disabled={!industry}
        >
          <option value="">Select a company</option>
          {companies.sort().map((company, index) => {
            const companyData = data.find((item) => item.name === company);
            const stockSymbol = companyData ? `(${companyData.symbol})` : "";

            return (
              <option key={index} value={company}>
                {`${company} ${stockSymbol}`}
              </option>
            );
          })}
        </select>
      </label>

      {/* SearchDateBar component */}
      <SearchDateBar
        timestamps={timestamps.reverse()}
        onSubmit={handleDateSearch}
      />

      {/* StocksHistoryTable with filtered data */}
      <StocksHistoryTable rowData={tableData} />

      {/* Container for the chart */}
      <div className="chart-container">
        {filteredData.length > 0 && <div id="candlestick-chart"></div>}
      </div>
    </div>
  );
}
