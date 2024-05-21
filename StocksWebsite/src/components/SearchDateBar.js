import React, { useState } from "react";

// SearchDateBar component
export function SearchDateBar({ timestamps, onSubmit, id, name }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to handle event when user selects a start date
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  // Function to handle event when user selects an end date
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Function to handle event when user clicks Search button
  const handleSubmit = () => {
    onSubmit(startDate, endDate);
  };

  return (
    <div>
      <label>
        Start Date
        <select
          aria-labelledby={name}
          name="searchStartDate"
          id={id}
          value={startDate}
          onChange={handleStartDateChange}
          className="select-box"
        >
          <option value="">Select a date</option>
          {timestamps.map((timestamp, index) => (
            <option key={index} value={timestamp}>
              {timestamp}
            </option>
          ))}
        </select>
      </label>
      <label>
        End Date
        <select
          aria-labelledby={name}
          name="searchStartDate"
          id={id}
          value={endDate}
          onChange={handleEndDateChange}
          className="select-box"
        >
          <option value="">Select a date</option>
          {timestamps.map((timestamp, index) => (
            <option key={index} value={timestamp}>
              {timestamp}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
}
