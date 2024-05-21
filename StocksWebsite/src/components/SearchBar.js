// Import necessary dependencies
import React from "react";

// SearchBar component
export default function SearchBar(props) {
  const [innerSearch, setInnerSearch] = React.useState("");

  // Function to handle event when user types in input box
  const handleChange = (e) => {
    setInnerSearch(e.target.value);
  };

  // Function to handle event when user clicks Search button
  const handleSubmit = () => {
    props.onSubmit(innerSearch);
  };

  return (
    <div>
      <input
        aria-labelledby={props.name}
        name="search"
        id={props.id}
        type="search"
        placeholder={props.text}
        value={innerSearch}
        onChange={handleChange}
        className="input-box"
      />
      <button
        id={props.name}
        type="button"
        className="search-button"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
}
