import { useState, useEffect } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';
import backend from '../../../const/backend/backend';

export default function SubmitReview({ closeModal }) {
  // Existing states
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [schoolName, setSchoolName] = useState('');
  const [isAddingNewSchool, setIsAddingNewSchool] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Location states
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [schools, setSchools] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch all unique states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`${backend}/api/schools/states`);
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, []);

  // Fetch districts when state is selected
  useEffect(() => {
    if (selectedState) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(`${backend}/api/schools/districts?state=${selectedState}`);
          const data = await response.json();
          setDistricts(data);
          setSelectedDistrict('');
          setSelectedCity('');
          setCities([]);
          setSchools([]);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      };
      fetchDistricts();
    }
  }, [selectedState]);

  // Fetch cities when district is selected
  useEffect(() => {
    if (selectedDistrict) {
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `${backend}/api/schools/cities?state=${selectedState}&district=${selectedDistrict}`
          );
          const data = await response.json();
          setCities(data);
          setSchools([]); // Schools reset karna theek hai
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };
      fetchCities();
    }
  }, [selectedDistrict]);
  

  // Fetch schools when city is selected
   // Modified fetchSchools function with proper error handling
   useEffect(() => {
    if (selectedCity) {
      const fetchSchools = async () => {
        try {
          const response = await fetch(
            `${backend}/api/schools?state=${selectedState}&district=${selectedDistrict}&city=${selectedCity}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch schools');
          }
          
          const data = await response.json();
          
          // Ensure data is always treated as an array
          setSchools(Array.isArray(data) ? data : []);
          
        } catch (error) {
          console.error('Error fetching schools:', error);
          setSchools([]); // Fallback to empty array
        }
      };
      fetchSchools();
    }
  }, [selectedCity]);


  const handleSchoolChange = (e) => {
    const selectedSchool = e.target.value;
    if (selectedSchool === 'addNewSchool') {
      setIsAddingNewSchool(true);
      setSchoolName('');
    } else {
      setIsAddingNewSchool(false);
      setSchoolName(selectedSchool);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let schoolId;
    const token = localStorage.getItem('token');

    try {
      if (isAddingNewSchool) {
        // Include all location details when creating new school
        const schoolResponse = await fetch(`${backend}/api/schools`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            name: newSchoolName, 
            city: selectedCity,
            state: selectedState,
            district: selectedDistrict
          }),
        });

        const schoolData = await schoolResponse.json();
        schoolId = schoolData._id;
      } else {
        schoolId = schoolName;
      }

      const reviewResponse = await fetch(`${backend}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: reviewTitle,
          description: reviewDescription,
          rating,
          schoolId,
        }),
      });

      if (reviewResponse.ok) {
        console.log('Review submitted successfully');
        closeModal();
        window.location.reload();
      } else {
        console.error('Error submitting review');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal container with 100px margin */}
        <div 
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" 
          style={{ margin: '100px auto' }}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
            {/* Close button at top right */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FaTimes className="h-6 w-6" />
            </button>
            
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-xl z-50">
                <div className="w-16 h-16 border-4 border-blue-500 border-b-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Submit Your Review</h2>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[60vh] overflow-y-auto p-2 space-y-6">
                {/* Location Filters */}
                <div className="grid grid-cols-1 gap-4">
                  {/* State Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District Selection */}
                  {selectedState && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        required
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* City Selection */}
                  {selectedDistrict && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        required
                      >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* School Selection */}
                {selectedCity && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                      onChange={handleSchoolChange}
                      value={schoolName}
                      required={!isAddingNewSchool}
                    >
                      <option value="">Select a school</option>
                      <option value="addNewSchool">Add New School</option>
                      {Array.isArray(schools) && schools.length > 0 ? (
                        schools.map((school) => (
                          <option key={school._id} value={school._id}>
                            {school.name} ({school.city})
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>No schools found in this location</option>
                      )}
                    </select>
                  </div>
                )}

                {/* New School Name */}
                {isAddingNewSchool && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New School Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                      placeholder="Enter the new school's name"
                      value={newSchoolName}
                      onChange={(e) => setNewSchoolName(e.target.value)}
                      required
                    />
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Location: {selectedCity}, {selectedDistrict}, {selectedState}</p>
                    </div>
                  </div>
                )}

                {/* Review Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                    placeholder="Enter a title for your review"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer text-2xl ${
                          (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-400 transition duration-200`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review Description</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                    rows="4"
                    placeholder="Share your experience about the school"
                    value={reviewDescription}
                    onChange={(e) => setReviewDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              {/* Submit Button (fixed at bottom) */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
