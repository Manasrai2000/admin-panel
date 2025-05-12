'use client'
import { useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import Pagination from '@/components/Pagination';
import axios from 'axios';

const BASE_URL = 'https://test-apis.codebright.in/';

const DataTablePage = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1); // Initialize total pages
  const rowsPerPage = 20;

  const searchParams = useSearchParams();
  const submenuParam = searchParams.get('submenu');

  const submenu = useMemo(() => {
    try {
      return submenuParam ? JSON.parse(submenuParam) : null;
    } catch (e) {
      console.error('Failed to parse submenu:', e);
      return null;
    }
  }, [submenuParam]);

  const submenuName = submenu?.PR_MENU_NAME ?? 'Unknown Submenu';

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('authToken');
        const requestBody = {
          CBT_REQUEST_DATA: {
            COMPANY_ID: '', // Fill as needed
            USER_ID: '2', // Update dynamically if needed
            PR_QUERY: '',
            PR_TYPE: '',
            PR_PAGE_NO: currentPage, // Send current page to API
            PR_TOKEN: token,
            PR_DATA_LIMIT: rowsPerPage,
          },
          CBT_TRACKING_DATA: {
            PR_LOCATION: '',
            PR_IP_ADDRESS: '',
            PR_LAT_LONG: 'asdas',
            PR_BATTERY: 'rewrw',
            PR_OS: 'dewrewr',
            PR_PHONE_BRAND: '',
            PR_ACTIVITY_TYPE: '',
            PR_KM: '',
          },
        };

        const response = await axios.post(
          `${BASE_URL.replace(/\/$/, '')}/${submenu?.PR_LIST_URL?.replace(/^\//, '')}`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const items = response.data?.DATA?.ITEM_DATA || [];
        const tableHeaders = response.data?.DATA?.LIST_HEADER[0] || [];
        const pageCount = response.data?.PAGE_COUNT || 1; // Get total pages from API

        setData(items);
        setHeaders(tableHeaders);
        setTotalPages(pageCount); // Update total pages
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please check your network connection or submenu configuration.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [submenu, currentPage]); // Refetch data when currentPage changes

  // Filter data (search)
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      row.ROW_DATA.some((cell) =>
        cell.VALUE?.toString()?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">{submenuName}</h1>

      {/* Search Input */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[250px] border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="loader w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-center py-6 text-red-500">{error}</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-left font-medium sticky top-0 z-10"
                    style={{
                      textAlign: header.ALIGN_ROW?.toLowerCase() || 'left',
                      color: header.COLOR || 'inherit',
                      backgroundColor: header.BG_COLOR || '#f9fafb',
                    }}
                  >
                    {header.TITLE}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`hover:bg-blue-50 ${
                      rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    {row.ROW_DATA.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 px-4 py-2 text-sm"
                        style={{
                          textAlign: cell.ALIGN?.toLowerCase() || 'left',
                          color: cell.COLOR || 'inherit',
                          backgroundColor: cell.BG_COLOR || 'inherit',
                        }}
                      >
                        {cell.VALUE}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="text-center py-6 text-gray-500"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {data.length > 0 && !loading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default DataTablePage;