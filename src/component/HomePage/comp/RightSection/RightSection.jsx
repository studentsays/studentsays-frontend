import { useState, useEffect } from 'react';
import { FaSchool, FaMedal, FaSearch, FaMapMarkerAlt, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import backend from '../../../const/backend/backend';
import Loader from '../../../externalwork/loader';

export default function RightSection() {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('students');
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20, // Set limit to 15 items per page
    total: 0,
    pages: 0
  });
  const navigate = useNavigate();

  const fetchSchools = async (retry = 0) => {
    try {
      setLoading(true);
      setError(null);
      
      // Always pass a search term parameter - use a space character if empty
      const effectiveSearchTerm = searchTerm || " ";
      
      console.log(`Fetching schools with search: "${effectiveSearchTerm}" (Attempt: ${retry + 1}, Page: ${pagination.page})`);
      
      // Set a higher limit of 50 schools per page
      const pageLimit = 20;
      
      // Add page and limit parameters to the API URL
      const apiUrl = `${backend}/api/schoolsWithReviews?searchTerm=${encodeURIComponent(effectiveSearchTerm)}&page=${pagination.page}&limit=${pageLimit}`;
      console.log(`API URL: ${apiUrl}`);
      
      // Reduce timeout for retries to avoid long waits
      const timeoutDuration = retry > 0 ? 8000 : 15000;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);
      
      const response = await fetch(
        apiUrl,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error(`API Error: Status ${response.status} - ${response.statusText}`);
        const errorText = await response.text();
        console.error(`Error response: ${errorText}`);
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API response data structure:', data);
      
      // Handle the specific API response format
      if (data && data.schools && Array.isArray(data.schools)) {
        // Set schools from the schools array in the response
        setSchools(data.schools);
        
        // Handle pagination data
        if (data.pagination) {
          setPagination({
            ...pagination,
            page: data.pagination.currentPage || pagination.page,
            limit: pageLimit,
            total: data.pagination.totalCount || data.schools.length,
            pages: data.pagination.totalPages || Math.ceil(data.schools.length / pageLimit),
          });
        } else {
          // Fallback if pagination info is missing
          setPagination({
            ...pagination,
            limit: pageLimit,
            total: data.schools.length,
            pages: Math.ceil(data.schools.length / pageLimit),
          });
        }
      } else if (Array.isArray(data)) {
        // Handle case where API returns an array directly
        setSchools(data);
        setPagination({
          ...pagination,
          limit: pageLimit,
          total: data.length,
          pages: Math.max(Math.ceil(data.length / pageLimit), 1)
        });
      } else {
        console.error('Unexpected API response format:', data);
        setSchools([]);
        setPagination({
          ...pagination,
          limit: pageLimit,
          total: 0,
          pages: 1
        });
      }
      
      // Reset retry count on success
      setRetryCount(0);
      
      // Cache only the current page results with metadata
      const cacheKey = `cachedSchoolsWithReviews_${effectiveSearchTerm}_${pagination.page}`;
      try {
        localStorage.setItem(cacheKey, JSON.stringify({
          data: data,
          page: pagination.page,
          timestamp: new Date().getTime()
        }));
      } catch (error) {
        console.error('Error caching schools:', error);
      }
      
    } catch (error) {
      console.error('Error fetching schools:', error.message);
      
      // Handle timeout specifically
      if (error.name === 'AbortError') {
        const errorMsg = 'Request timed out - API server may be down or unresponsive';
        console.error(errorMsg);
        setError(errorMsg);
        
        // Try fallback data or retry
        if (retry < 2) { // Limit to 2 retries
          console.log(`Retrying request (${retry + 1}/2)...`);
          setRetryCount(retry + 1);
          // Wait a bit before retry
          setTimeout(() => fetchSchools(retry + 1), 1000);
          return;
        }
        
        // After retries, use cached data if available
        const cacheKey = `cachedSchoolsWithReviews_${searchTerm || " "}_${pagination.page}`;
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          try {
            const parsed = JSON.parse(cachedData);
            setSchools(parsed.data.schools || []);
            console.log(`Using cached schools data for page ${pagination.page}`);
            setError('Using cached data - server is currently unavailable');
          } catch (cacheError) {
            console.error('Error parsing cached data:', cacheError);
          }
        }
      } else {
        setError(`Error: ${error.message}`);
      }
      
      setSchools([]);
    } finally {
      setLoading(false);
    }
};
  useEffect(() => {
    // Debounce search to prevent too many API calls
    const timer = setTimeout(() => {
      fetchSchools(0); // Reset retry count on new search
    }, 500);

    return () => clearTimeout(timer);
  }, [pagination.page, searchTerm]);

  // Cache successful responses
  useEffect(() => {
    if (schools.length > 0) {
      try {
        localStorage.setItem('cachedSchools', JSON.stringify(schools));
      } catch (error) {
        console.error('Error caching schools:', error);
      }
    }
  }, [schools]);

  const handleSchoolClick = (schoolId) => {
    console.log('Navigating to school:', schoolId);
    navigate(`/school/${schoolId}`);
  };

  if (loading && schools.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Explore</h2>
        <p className="text-sm text-gray-600">Find the best schools based on student reviews</p>
      </div>
      
      {/* Section Tabs */}
      <div className="flex mb-6 bg-white rounded-xl shadow-md p-1">
        <button
          onClick={() => setActiveSection('students')}
          className={`w-1/2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
            activeSection === 'students'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-transparent text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-center">
            <FaSchool className="mr-2" />
            <span>Schools</span>
          </div>
        </button>
        <button
          onClick={() => window.location.href = "/studentsays-times"}
          className={`w-1/2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
            activeSection === 'schools'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-transparent text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-center">
            <FaComments className="mr-2" />
            <span>Student Says Times</span>
          </div>
        </button>
      </div>

      {/* Conditional Rendering Based on Active Section */}
      {activeSection === 'students' ? (
        <div className="mb-6 z-0">
        {/* Search Box */}
        <div className="flex items-center w-full bg-white border-0 rounded-xl shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 transition-all">
          {/* Search Icon */}
          <div className="pl-4 pr-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
      
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="w-full py-3 pr-12 bg-white text-gray-700"
          />
      
          {/* Loading Spinner */}
          {loading && (
            <div className="pr-4 flex items-center">
              <div className="w-5 h-5 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      

          {/* Error Message Display */}
          {error && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                {error}
              </p>
              {error.includes('server is currently unavailable') && (
                <button 
                  onClick={() => fetchSchools(0)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Try again
                </button>
              )}
            </div>
          )}

          {/* Section Title */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {pagination.total} School{pagination.total !== 1 ? 's' : ''}
            </h3>
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">View All</span>
          </div>

          {/* Schools List */}
          <div className="space-y-4 transition-opacity duration-300" 
               style={{ 
                 paddingBottom: '60px',
                 opacity: loading ? 0.6 : 1 
               }}>
            {/* Add null/empty check here before accessing 'length' property */}
            {schools && schools.length > 0 ? (
  <>
    {schools.map((school) => (
      <div
        key={school._id || school.id}
        className={`flex items-center bg-white p-5 rounded-xl shadow-sm hover:shadow-lg border transition-all duration-200 cursor-pointer ${
          school.reviewCount > 0 
            ? 'border-l-4 border-l-blue-500 border-gray-100' 
            : 'border-gray-100 opacity-80'
        }`}
        onClick={() => handleSchoolClick(school._id || school.id)}
      >
        {/* Rest of your school card remains the same */}
        <div className="bg-blue-50 p-3 rounded-lg mr-4">
          <FaSchool className="text-blue-600" size={28} />
        </div>

        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{school.name}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <FaMapMarkerAlt className="mr-1 text-gray-400" size={12} />
            <p>
              {school.city || 
               (school.district && school.state ? `${school.district}, ${school.state}` : 
                school.district ? school.district : 
                school.state ? school.state : 
                'Location not available')}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className={`text-sm font-bold px-3 py-1 rounded-full shadow-sm ${
            school.reviewCount > 0
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {school.reviewCount || '0'} Reviews
          </span>
          <span className="text-xs text-blue-600 mt-1 hover:underline">View details</span>
        </div>
      </div>
    ))}

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => setPagination(prev => ({...prev, page: prev.page - 1}))}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-white border rounded-lg shadow-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span>Page {pagination.page} of {pagination.pages}</span>
                  <button
                    onClick={() => setPagination(prev => ({...prev, page: prev.page + 1}))}
                    disabled={pagination.page === pagination.pages}
                    className="px-4 py-2 bg-white border rounded-lg shadow-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 bg-white rounded-xl shadow-sm">
                <FaSchool className="mx-auto text-gray-300" size={48} />
                <p className="mt-4 text-gray-500">No schools found matching your search.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setPagination(prev => ({...prev, page: 1}));
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-700"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Coming Soon</h1>
            <p className="text-lg text-blue-100">
              We're working on something amazing for this section.
            </p>
          </div>
          <div className="p-8 text-center">
            <svg
              className="w-16 h-16 mx-auto text-purple-500 animate-bounce"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="mt-6 text-gray-600">
              Stay tuned for updates on our newest feature. We're building something special to enhance your experience.
            </p>
            <button 
              onClick={() => setActiveSection('students')}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Back to Schools
            </button>
          </div>
        </div>
      )}
    </div>
  );
}