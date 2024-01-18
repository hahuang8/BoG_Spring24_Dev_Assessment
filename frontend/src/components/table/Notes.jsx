import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Component to render when /notes/{id} is accessed
export const Notes = () => {
  // State to hold user data
  const [userData, setUserData] = useState(null);

  // ID corresponding to the route /notes/{id}
  const { id } = useParams();
  const navigate = useNavigate();
  const locationState = useLocation().state;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/bog/users/${id}`)
      .then((response) => response.data)
      .then((user) => setUserData(user))
      .catch((error) => console.error(`Error fetching user: ${id}`, error));
  }, [id]);

  // If user data is not yet available, show a loading message
  if (!userData) {
    return (
      <div>
        <h1>{locationState.name}</h1>
        <img
          src={locationState.avatar}
          alt={`${locationState.name}'s avatar`}
        />
        <h2>Notes</h2>
        <p>Notes currently unavailable</p>
        {/* Button to navigate back to the previous page */}
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    );
  }

  // Render user details and notes
  return (
    <div>
      <h1>{userData.name}</h1>
      <img src={userData.avatar} alt={`${userData.name}'s avatar`} />
      <h2>Notes</h2>
      <p>{userData.notes}</p>
      {/* Button to navigate back to the previous page */}
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
};
