import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputValue, setInputValue] = useState(currentPage);

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 5; // Number of pages to show in pagination

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        visiblePages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        visiblePages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(inputValue, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setInputValue(currentPage); // Reset to current page if invalid
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt; Prev
      </button>
      {visiblePages.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page
                ? 'bg-blue-500 text-white border-blue-500'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next &gt;
      </button>
      <form onSubmit={handleInputSubmit} className="ml-4">
        <label htmlFor="pageInput" className="sr-only">
          Page Number
        </label>
        <input
          id="pageInput"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="w-16 px-2 py-1 border rounded text-center"
          min="1"
          max={totalPages}
        />
        <button
          type="submit"
          className="ml-2 px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Go
        </button>
      </form>
    </div>
  );
};

export default Pagination;