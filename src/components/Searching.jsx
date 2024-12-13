// Import required modules
import React, { useState, useEffect } from "react";

// Example JSON data
const data = [
  { id: 1, name: "Alice", age: 25, country: "USA" },
  { id: 2, name: "Bob", age: 30, country: "Canada" },
  { id: 3, name: "Charlie", age: 35, country: "UK" },
  { id: 4, name: "Diana", age: 28, country: "Australia" },
  { id: 5, name: "Eve", age: 22, country: "India" },
  // Add more records as needed
];

const TableComponent = () => {
  // State variables
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(3);

  useEffect(() => {
    // Simulating data fetching
    setTableData(data);
  }, []);

  // Handle search with debouncing
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filteredData = data.filter((item) =>
        Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setTableData(filteredData);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Sorting mechanism
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setTableData(sortedData);
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Data Table</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Table */}
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
            <th onClick={() => handleSort("country")}>Country</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.country}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {Array.from(
          { length: Math.ceil(tableData.length / rowsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              style={{
                margin: "5px",
                padding: "5px 10px",
                backgroundColor: currentPage === index + 1 ? "lightblue" : "white",
              }}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TableComponent;
