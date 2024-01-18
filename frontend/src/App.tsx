import React, { useState, useEffect } from "react";
import { MainTable } from "./components/table/MainTable";
import { Notes } from "./components/table/Notes";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  // State to track window width and height
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Effect to update window dimensions on resize
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="ag-theme-quartz"
        style={{
          // Set the width and height of the container based on window dimensions
          width: windowWidth - windowWidth * 0.1,
          height: windowHeight - windowHeight * 0.1,
          padding: "1%",
        }}
      >
        <Routes>
          {/* Route for the main table when isAdmin is false */}
          <Route path="/" element={<MainTable isAdmin={false} />} />

          {/* Route for the main table when isAdmin is true (admin mode) */}
          <Route path="/admin/" element={<MainTable isAdmin={true} />} />

          {/* Route for displaying notes based on user ID */}
          <Route path="/notes/:id" element={<Notes />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
