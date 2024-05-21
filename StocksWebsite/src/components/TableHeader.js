// Import necessary dependencies
import SearchBar from "./SearchBar";

// TableHeader component
export default function TableHeader({
  setSearchStock,
  setSearchCompany,
  setSearchIndustry,
}) {
  return (
    <>
      <h3 className="headline">STOCKS SUMMARY</h3>

      {/* 3 search bars corresponding to 3 columns of the result table */}
      <SearchBar
        id="search-stock"
        name="search-button"
        text="Enter stock symbol"
        onSubmit={(innerSearch) => {
          setSearchStock(innerSearch);
          setSearchCompany("");
          setSearchIndustry("");
        }}
      />
      <SearchBar
        id="search-company"
        name="search-button"
        text="Enter company name"
        onSubmit={(innerSearch) => {
          setSearchCompany(innerSearch);
          setSearchStock("");
          setSearchIndustry("");
        }}
      />
      <SearchBar
        id="search-industry"
        name="search-industry-button"
        text="Enter industry"
        onSubmit={(innerSearch) => {
          setSearchIndustry(innerSearch);
          setSearchStock("");
          setSearchCompany("");
        }}
        isIndustry
      />
    </>
  );
}
